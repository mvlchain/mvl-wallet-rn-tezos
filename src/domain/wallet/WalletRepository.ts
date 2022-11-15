import qs from 'qs';
import { injectable } from 'tsyringe';

import appconfig from '@@config/appconfig';
import { Network } from '@@constants/network.constant';
import { WalletDto } from '@@domain/model/WalletDto';
import { BalanceResponseDto, RegisterWalletDto, WalletResponseDto } from '@@generated/generated-scheme';
import { authRequest } from '@@utils/request';

export interface WalletRepository {
  getWallets: (extendedPublicKey: string) => Promise<WalletDto[]>;
  registerWallet: (body: RegisterWalletDto) => Promise<WalletResponseDto>;
  getBalance: (address: string, network: Network) => Promise<BalanceResponseDto[]>;
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
  getWallets = async (extendedPublicKey: string): Promise<WalletDto[]> => {
    const endpoint = `v1/wallets?${qs.stringify({
      pubkey: extendedPublicKey,
    })}`;
    const res = await authRequest.get<WalletDto[]>(endpoint);
    return res.data;
  };

  registerWallet = async (body: RegisterWalletDto): Promise<WalletResponseDto> => {
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
  };

  getBalance = async (address: string, network: Network): Promise<BalanceResponseDto[]> => {
    const endpoint = `v1.2/wallets/balance?${qs.stringify({
      address,
      network,
    })}`;
    const res = await authRequest.get<BalanceResponseDto[]>(endpoint);
    return res.data;
  };
}
