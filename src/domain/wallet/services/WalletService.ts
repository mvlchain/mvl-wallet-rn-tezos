import { injectable, inject } from 'tsyringe';

import { getNetworkConfig, NETWORK_ID } from '@@constants/network.constant';
import { KeyClient } from '@@domain/auth/clients/KeyClient';
import { RootKeyRepository } from '@@domain/auth/repositories/RootKeyRepository';
import { Clutch, CLUTCH_EXTENDED_KEY_PATH } from '@@domain/blockchain/Clutch';
import { WalletDto } from '@@domain/model/WalletDto';
import { WalletRepository } from '@@domain/wallet/repositories/WalletRepository';
import { WalletResponseDto } from '@@generated/generated-scheme';

import { IWallet, IWalletClient } from '../clients/walletClient.type';

import { ICreateWalletBody, IGetWalletInfoParam, IGetWalletPKeyParam } from './WalletService.type';

export interface WalletService {
  extendedPublicKeyByCredentials(): Promise<string>;
  signMessageByExtendedKey(data: any): Promise<string>;
  getWalletInfo(param: IGetWalletInfoParam): Promise<IWallet>;
  getWalletList(): Promise<WalletDto[]>;
  createWallet(body: ICreateWalletBody): Promise<WalletResponseDto>;
  getWalletPKey(param: IGetWalletPKeyParam): Promise<string>;
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
    @inject('EhtersClient') private ehtersClient: IWalletClient,
    @inject('TezosClient') private tezosClient: IWalletClient
  ) {}

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

  getWalletInfo = async ({ index, network }: IGetWalletInfoParam) => {
    let walletClient: IWalletClient = this.ehtersClient;
    // TODO: Client를 선택할 때 각 함수에서 하는게 별로다. 어떻게 해야할까?
    const networkId = getNetworkConfig(network).networkId;
    if (networkId === NETWORK_ID.ETHEREUM || networkId === NETWORK_ID.BSC) {
      walletClient = this.ehtersClient;
    } else if (networkId === NETWORK_ID.XTZ) {
      walletClient = this.tezosClient;
    }
    const wallet = walletClient.wallet;
    const pKey = await this.keyClient.getPrivateKey();
    const derivePath = walletClient.getDerivePath(index);
    await walletClient.createWalletWithEntropy(pKey, derivePath);
    return wallet;
  };

  /**
   * @returns Get a list of wallets
   */
  getWalletList = async (): Promise<WalletDto[]> => {
    const xpub = await this.rootkeyRepository.getExtendedPublicKey();
    return this.walletRepository.getWallets(xpub);
  };

  createWallet = async ({ index, network }: ICreateWalletBody): Promise<WalletResponseDto> => {
    const wallet = await this.getWalletInfo({ index, network });
    return this.walletRepository.registerWallet({
      network: getNetworkConfig(network).networkId,
      address: wallet.address,
      index,
      name: `Wallet ${index + 1}`,
    });
  };

  getWalletPKey = async ({ index, network }: IGetWalletPKeyParam) => {
    const wallet = await this.getWalletInfo({ index, network });
    return wallet.privateKey;
  };
}
