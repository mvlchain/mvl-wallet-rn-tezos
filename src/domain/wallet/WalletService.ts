import { injectable, inject } from 'tsyringe';

import { Clutch, CLUTCH_EXTENDED_KEY_PATH } from '@@domain/blockchain/Clutch';
import { WalletDto } from '@@domain/model/WalletDto';
import { WalletRepository } from '@@domain/wallet/WalletRepository';

import ShareRepository from '../auth/ShareRepository';

export interface WalletService {
  extendedPublicKeyByCredentials(): Promise<string>;
  signMessageByExtendedKey(data: any): Promise<string>;
  getWalletList(): Promise<WalletDto[]>;
}

/**
 * TODO ShareRepository can be injected by DI. improve it.
 */
@injectable()
export class WalletServiceImpl implements WalletService {
  constructor(@inject('WalletRepository') private walletRepository: WalletRepository) {}

  /**
   * Get an extended public key by KeyChain credentials
   * @returns
   */
  async extendedPublicKeyByCredentials(): Promise<string> {
    const rootKey = await ShareRepository.getRootKeyByCredentials();
    return Clutch.extendedPublicKey(rootKey, CLUTCH_EXTENDED_KEY_PATH);
  }

  /**
   * sign contents with extend key pair
   *  1. get root private key with pin code decryption
   *  2. retreive extend key pair
   *  3. sign message.
   * @param data
   * @returns
   */
  async signMessageByExtendedKey(data: any): Promise<string> {
    const extendedKeyPair = await ShareRepository.getExtendedKeyPairByCredentials();
    const timestampInMs = `${Date.now()}`;
    let message;
    if (typeof data === 'string') {
      message = data;
    } else {
      message = JSON.stringify(data, null, 0);
    }

    return await Clutch.signMessageByExtendedKeyPair(extendedKeyPair, message, timestampInMs);
  }

  /**
   * @returns Get a list of wallets
   */
  async getWalletList(): Promise<WalletDto[]> {
    const xpub = await ShareRepository.getExtendedPublicKey();
    return this.walletRepository.getWallets(xpub);
  }
}
