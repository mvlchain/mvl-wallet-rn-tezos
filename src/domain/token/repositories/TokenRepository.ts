import { injectable } from 'tsyringe';

import { Network } from '@@constants/network.constant';
import { TokenDto } from '@@generated/generated-scheme-clutch';
import { request } from '@@utils/request';

export interface ITokenRepository {
  getToken: (network: Network) => Promise<TokenDto[]>;
}

@injectable()
export class TokenRepository implements ITokenRepository {
  getToken = async (network: Network): Promise<TokenDto[]> => {
    const endpoint = `v1/token/${network}`;
    const res = await request.get<TokenDto[]>(endpoint);
    return res.data;
  };
}
