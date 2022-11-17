import { injectable, inject } from 'tsyringe';

import { RootKeyRepository } from '@@domain/auth/repositories/RootKeyRepository';
import { Clutch, CLUTCH_EXTENDED_KEY_PATH } from '@@domain/blockchain/Clutch';
import { WalletDto } from '@@domain/model/WalletDto';
import { WalletRepository } from '@@domain/wallet/repositories/WalletRepository';
import { WalletResponseDto } from '@@generated/generated-scheme';

import { ICreateWalletBody, IGetWalletInfoParam, IGetWalletPKeyParam } from './WalletService.type';

export interface WalletService {
  extendedPublicKeyByCredentials(): Promise<string>;
  signMessageByExtendedKey(data: any): Promise<string>;
  getWalletInfo(param: IGetWalletInfoParam): Clutch;
  getWalletList(): Promise<WalletDto[]>;
  createWallet(body: ICreateWalletBody): Promise<WalletResponseDto>;
  getWalletPKey(param: IGetWalletPKeyParam): string;
}

/**
 * TODO ShareRepository can be injected by DI. improve it.
 */
@injectable()
export class WalletServiceImpl implements WalletService {
  constructor(
    @inject('WalletRepository') private walletRepository: WalletRepository,
    @inject('RootKeyRepository') private rootkeyRepository: RootKeyRepository
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

  getWalletInfo = ({ pKey, index, blockchain }: IGetWalletInfoParam) => {
    const wallet = Clutch.createWalletWithEntropy(pKey, `m/44'/${blockchain.coinType}'/0'/0/${index}`);
    return wallet;
  };

  /**
   * @returns Get a list of wallets
   */
  getWalletList = async (): Promise<WalletDto[]> => {
    const xpub = await this.rootkeyRepository.getExtendedPublicKey();
    return this.walletRepository.getWallets(xpub);
  };

  createWallet = async ({ pKey, index, blockchain }: ICreateWalletBody): Promise<WalletResponseDto> => {
    const wallet = this.getWalletInfo({ pKey, index, blockchain });
    return this.walletRepository.registerWallet({
      network: blockchain.name,
      address: wallet.address,
      index,
      name: `Wallet ${index + 1}`,
    });
  };

  getWalletPKey = ({ pKey, index, blockchain }: IGetWalletPKeyParam) => {
    const wallet = this.getWalletInfo({ pKey, index, blockchain });
    return wallet.privateKey;
  };
}
