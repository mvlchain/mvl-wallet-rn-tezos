import { injectable } from 'tsyringe';

import { ApiError } from '@@domain/error/ApiError';
import { WalletDto } from '@@domain/model/WalletDto';
import { authenticatedRequest } from '@@utils/request';

export interface WalletRepository {
  getWallets(extendedPublicKey: string): Promise<WalletDto[]>;
}

@injectable()
export class WalletRepositoryImpl implements WalletRepository {
  /**
   * Get a list of wallet
   * @param extendedPublicKey extended root public key
   * @throws {ApiError} when api failed.
   * @throws Error when unexpected error occured
   */
  async getWallets(extendedPublicKey: string): Promise<WalletDto[]> {
    try {
      const endpoint = 'v1/wallets';
      const res = await authenticatedRequest.get(endpoint, {
        params: { pubkey: extendedPublicKey },
      });

      if (res.ok) {
        return res.data;
      } else {
        throw new ApiError(`Api failure. get:${endpoint}`, res.status);
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
