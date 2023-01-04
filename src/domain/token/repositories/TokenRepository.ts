import { injectable } from 'tsyringe';

import { NetworkId } from '@@constants/network.constant';
import { TokenDto } from '@@store/token/tokenPersistStore.type';
import { request } from '@@utils/request';

export interface ITokenRepository {
  getToken: (network: NetworkId) => Promise<TokenDto[]>;
}

@injectable()
export class TokenRepository implements ITokenRepository {
  getToken = async (network: NetworkId): Promise<TokenDto[]> => {
    const endpoint = `v1/token/${network}`;
    const res = await request.get<TokenDto[]>(endpoint);
    return res.data;
  };
}
