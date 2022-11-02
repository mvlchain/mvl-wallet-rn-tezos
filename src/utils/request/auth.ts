import { Method } from 'axios';
import { container, inject, injectable } from 'tsyringe';

import { WalletService } from '@@domain/wallet/WalletService';

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

/**
 * Configuration for AuthRequest
 */
@injectable()
class AuthenticationConfiguration {
  constructor(@inject('WalletService') private walletService: WalletService) {}

  // xHmacAuthorization
  async getAuthorization(data: any): Promise<string> {
    return await this.walletService.signMessageByExtendedKey(data);
  }
}

/**
 * API request factory that automatically adds xHmacAuthorization to http header
 */
const doAuthRequest =
  (method: Method) =>
  async <D = any>(endpoint: string, reqConfig: RequestConfig = {}): Promise<Response<D>> => {
    const authenticationConfiguration = container.resolve(AuthenticationConfiguration);
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

        return await promiseRequest(method)(endpoint, reqConfig);
      } else {
        res.data = getUnauthorizedData();

        return res;
      }
    }

    return res;
  };

export const authRequest = {
  get: doAuthRequest('get'),
  post: doAuthRequest('post'),
  put: doAuthRequest('put'),
  delete: doAuthRequest('delete'),
};
