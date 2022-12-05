import { injectable, inject } from 'tsyringe';

import { getNetworkConfig, Network, NetworkId, NETWORK_ID } from '@@constants/network.constant';
import { KeyClient } from '@@domain/auth/clients/KeyClient';
import { RootKeyRepository } from '@@domain/auth/repositories/RootKeyRepository';
import { Clutch, CLUTCH_EXTENDED_KEY_PATH } from '@@domain/blockchain/Clutch';
import { WalletDto } from '@@domain/model/WalletDto';
import { WalletRepository } from '@@domain/wallet/repositories/WalletRepository';
import { WalletResponseDto } from '@@generated/generated-scheme';

import { IWallet, IWalletClient } from '../clients/WalletClient.type';

import * as Type from './WalletService.type';

export interface WalletService {
  walletClient: Type.IServiceWalletClient;
  extendedPublicKeyByCredentials(): Promise<string>;
  signMessageByExtendedKey(data: any): Promise<string>;
  getWalletInfo(param: Type.IGetWalletInfoParam): Promise<IWallet>;
  getWalletList(networkId: NetworkId): Promise<WalletDto[]>;
  createWallet(body: Type.ICreateWalletBody): Promise<WalletResponseDto>;
  getWalletPKey(param: Type.IGetWalletPKeyParam): Promise<string>;
}

/**
 * TODO ShareRepository can be injected by DI. improve it.
 */
@injectable()
export class WalletServiceImpl implements WalletService {
  walletClient: Type.IServiceWalletClient;
  constructor(
    @inject('WalletRepository') private walletRepository: WalletRepository,
    @inject('RootKeyRepository') private rootkeyRepository: RootKeyRepository,
    @inject('KeyClient') private keyClient: KeyClient,
    @inject('EhtersClient') private ehtersClient: IWalletClient,
    @inject('TezosClient') private tezosClient: IWalletClient
  ) {
    // TODO: Object로 가져갈지 함수로 가져갈지 고민중입니다.
    this.walletClient = {
      [NETWORK_ID.ETHEREUM]: this.ehtersClient,
      [NETWORK_ID.BSC]: this.ehtersClient,
      [NETWORK_ID.XTZ]: this.tezosClient,
    };
  }

  // 함수로 가져갔을 경우
  // setWallet = (networkId: NetworkId) => {
  //   switch (networkId) {
  //     case NETWORK_ID.ETHEREUM:
  //     case NETWORK_ID.BSC:
  //       return this.ehtersClient;
  //     case NETWORK_ID.XTZ:
  //       return this.tezosClient;
  //     default:
  //       return this.ehtersClient;
  //   }
  // };

  /**
   * Get an extended public key by KeyChain credentials
   * @returns
   */
  extendedPublicKeyByCredentials = async (): Promise<string> => {
    const rootKey = await this.rootkeyRepository.getRootKeyByCredentials();
    return Clutch.extendedPublicKey(rootKey, CLUTCH_EXTENDED_KEY_PATH);
  };

  /**
   * sign contents with extend key pair
   *  1. get root private key with pin code decryption
   *  2. retreive extend key pair
   *  3. sign message.
   * @param data
   * @returns
   */
  signMessageByExtendedKey = async (data: any): Promise<string> => {
    const extendedKeyPair = await this.rootkeyRepository.getExtendedKeyPairByCredentials();
    const timestampInMs = `${Date.now()}`;
    let message;
    if (typeof data === 'string') {
      message = data;
    } else {
      message = JSON.stringify(data ?? {}, null, 0);
    }

    return await Clutch.signMessageByExtendedKeyPair(extendedKeyPair, message, timestampInMs);
  };

  getWalletInfo = async ({ index, network }: Type.IGetWalletInfoParam) => {
    // TODO: Client를 선택할 때 각 함수에서 하는게 별로다. 어떻게 해야할까?
    const networkId = getNetworkConfig(network).networkId;
    const client = this.walletClient[networkId];
    const pKey = await this.keyClient.getPrivateKey();
    const derivePath = client.getDerivePath(index);
    const wallet = await client.createWalletWithEntropy(pKey, derivePath);
    return wallet;
  };

  /**
   * @returns Get a list of wallets
   */
  getWalletList = async (networkId: NetworkId): Promise<WalletDto[]> => {
    const xpub = await this.rootkeyRepository.getExtendedPublicKey();
    return this.walletRepository.getWallets(xpub, networkId);
  };

  createWallet = async ({ index, network }: Type.ICreateWalletBody): Promise<WalletResponseDto> => {
    const wallet = await this.getWalletInfo({ index, network });
    return this.walletRepository.registerWallet({
      network: getNetworkConfig(network).networkId,
      address: wallet.address,
      index,
      name: `Wallet ${index + 1}`,
    });
  };

  getWalletPKey = async ({ index, network }: Type.IGetWalletPKeyParam) => {
    const wallet = await this.getWalletInfo({ index, network });
    return wallet.privateKey;
  };

  setWalletClient = (network: Network) => {};
}
