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
  extendedPublicKeyByCredentials(): Promise<string>;
  signMessageByExtendedKey(data: any): Promise<string>;
  getWalletInfo(param: Type.IGetWalletInfoParam): Promise<IWallet>;
  getWalletList(networkId: NetworkId): Promise<WalletDto[]>;
  createWallet(body: Type.ICreateWalletBody): Promise<WalletResponseDto>;
  getWalletPKey(param: Type.IGetWalletPKeyParam): Promise<string>;
  setWalletClient(network: Network): IWalletClient;
}

/**
 * TODO ShareRepository can be injected by DI. improve it.
 */
@injectable()
export class WalletServiceImpl implements WalletService {
  constructor(
    @inject('WalletRepository') private walletRepository: WalletRepository,
    @inject('RootKeyRepository') private rootkeyRepository: RootKeyRepository,
    @inject('KeyClient') private keyClient: KeyClient,
    @inject('EthersWalletClient') private ethersWalletClient: IWalletClient,
    @inject('TezosClient') private tezosWalletClient: IWalletClient
  ) {}

  setWalletClient = (network: Network): IWalletClient => {
    const networkId = getNetworkConfig(network).networkId;
    switch (networkId) {
      case NETWORK_ID.ETHEREUM:
      case NETWORK_ID.BSC:
        return this.ethersWalletClient;
      case NETWORK_ID.XTZ:
        return this.tezosWalletClient;
    }
  };

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
    const client = this.setWalletClient(network);
    const pKey = await this.keyClient.getPrivateKey();
    const wallet = await client.createWalletWithEntropy(pKey, index);
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
}
