import { injectable, inject } from 'tsyringe';

import { Network } from '@@constants/network.constant';
import { KeyClient } from '@@domain/auth/clients/KeyClient';
import { RootKeyRepository } from '@@domain/auth/repositories/RootKeyRepository';
import { Clutch, CLUTCH_EXTENDED_KEY_PATH } from '@@domain/blockchain/Clutch';
import { WalletDto } from '@@domain/model/WalletDto';
import { WalletRepository } from '@@domain/wallet/repositories/WalletRepository';
import { WalletResponseDto } from '@@generated/generated-scheme';

import { ICreateWalletBody, IGetWalletInfoParam, IGetWalletPKeyParam, TCreateWallet } from './WalletService.type';

export interface WalletService {
  extendedPublicKeyByCredentials(): Promise<string>;
  signMessageByExtendedKey(data: any): Promise<string>;
  getWalletInfo(param: IGetWalletInfoParam): Promise<Clutch>;
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
    @inject('KeyClient') private keyClient: KeyClient
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

  getWalletInfo = async ({ index, bip44 }: IGetWalletInfoParam) => {
    const pKey = await this.keyClient.getPrivateKey();
    const wallet = Clutch.createWalletWithEntropy(pKey, `m/44'/${bip44}'/0'/0/${index}`);
    return wallet;
  };

  /**
   * @returns Get a list of wallets
   */
  getWalletList = async (): Promise<WalletDto[]> => {
    const xpub = await this.rootkeyRepository.getExtendedPublicKey();
    return this.walletRepository.getWallets(xpub);
  };

  _filterNetwork = (network: Network): TCreateWallet => {
    let filteredNetwork: TCreateWallet = 'ETHEREUM';
    switch (network) {
      case 'GOERLI':
        filteredNetwork = 'ETHEREUM';
        break;
      case 'BSC':
      case 'BSC_TESTNET':
        filteredNetwork = 'BSC';
        break;
      case 'TEZOS':
      case 'TEZOS_GHOSTNET':
        filteredNetwork = 'XTZ';
        break;
      default:
        filteredNetwork = 'ETHEREUM';
    }
    return filteredNetwork;
  };

  createWallet = async ({ index, bip44, network }: ICreateWalletBody): Promise<WalletResponseDto> => {
    const wallet = await this.getWalletInfo({ index, bip44 });
    const filteredNetwork = this._filterNetwork(network);
    return this.walletRepository.registerWallet({
      network: filteredNetwork,
      address: wallet.address,
      index,
      name: `Wallet ${index + 1}`,
    });
  };

  getWalletPKey = async ({ index, bip44 }: IGetWalletPKeyParam) => {
    const wallet = await this.getWalletInfo({ index, bip44 });
    return wallet.privateKey;
  };
}
