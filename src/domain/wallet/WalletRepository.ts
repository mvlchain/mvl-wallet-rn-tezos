import qs from 'qs';
import { injectable } from 'tsyringe';

import appconfig from '@@config/appconfig';
import { WalletDto } from '@@domain/model/WalletDto';
import { RegisterWalletDto, WalletResponseDto } from '@@generated/generated-scheme';
import { authRequest } from '@@utils/request';

export interface WalletRepository {
  getWallets(extendedPublicKey: string): Promise<WalletDto[]>;
  registerWallet(body: RegisterWalletDto): Promise<WalletResponseDto>;
}

@injectable()
export class WalletRepositoryImpl implements WalletRepository {
  private readonly authConfig = appconfig().auth;

  /**
   * Get a list of wallet
   * @param extendedPublicKey extended root public key
   * @throws {ApiError} when api failed.
   * @throws Error when unexpected error occured
   */
  async getWallets(extendedPublicKey: string): Promise<WalletDto[]> {
    const endpoint = `v1/wallets?${qs.stringify({
      pubkey: extendedPublicKey,
    })}`;
    const res = await authRequest.get<WalletDto[]>(endpoint);
    return res.data;
  }

  async registerWallet(body: RegisterWalletDto): Promise<WalletResponseDto> {
    const endpoint = 'v1/wallets';
    const basicCredential = `${this.authConfig.basic.username}:${this.authConfig.basic.password}`;
    const encoded = new Buffer(basicCredential, 'utf8').toString('base64');
    const res = await authRequest.post<WalletResponseDto>(endpoint, {
      headers: {
        Authorization: `Basic ${encoded}`,
      },
      data: body,
    });
    return res.data;
  }
}
