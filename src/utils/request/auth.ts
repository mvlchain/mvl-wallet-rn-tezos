import { Method } from 'axios';
import { container, inject, injectable } from 'tsyringe';

import { WalletService } from '@@domain/wallet/WalletService';
import { useDi } from '@@hooks/common/useDi';

import { promiseRequest } from './req';
import { RequestConfig, Response } from './type';

// @TODO update data
const getUnauthorizedData = () => ({
  error: 'Unauthorized',
  message: 'Your token has expired. Please login again.',
});

const HEADER_X_HMAC_SIG = 'x-hmac-sig';

// @TODO refresh
const tokenExpiredCallback = async () => {
  return {} as Response<any>;
};

//const walletService = useDi('WalletService');
@injectable()
class AuthenticationConfiguration {
  constructor(@inject('WalletService') private walletService: WalletService) {}

  // xHmacAuthorization
  async getAuthorization(data: any): Promise<string> {
    return await this.walletService.signMessageByExtendedKey(data);
  }
}
const authenticationConfiguration = container.resolve(AuthenticationConfiguration);

const authRequest =
  (method: Method) =>
  async <D = any>(endpoint: string, reqConfig: RequestConfig = {}): Promise<Response<D>> => {
    const xHmacAuthorization = await authenticationConfiguration.getAuthorization(reqConfig.data);

    reqConfig.headers = {
      ...reqConfig.headers,
      [HEADER_X_HMAC_SIG]: xHmacAuthorization,
    };

    const res = await promiseRequest(method)(endpoint, reqConfig);

    if (res.status === 401) {
      const refreshRes = await tokenExpiredCallback();

      if (refreshRes.ok) {
        reqConfig.headers[HEADER_X_HMAC_SIG] = await authenticationConfiguration.getAuthorization(reqConfig.data);

        const refetch = await promiseRequest(method)(endpoint, reqConfig);

        return refetch;
      } else {
        res.data = getUnauthorizedData();

        return res;
      }
    }

    return res;
  };

export const authenticatedRequest = {
  get: authRequest('get'),
  post: authRequest('post'),
  put: authRequest('put'),
  delete: authRequest('delete'),
};
