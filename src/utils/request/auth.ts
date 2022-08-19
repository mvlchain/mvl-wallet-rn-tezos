import { Method } from 'axios';

import { ETHEREUM } from '../../feature/core/BlockChain';
import { Clutch, extendedKeyPath } from '../../feature/core/Clutch';

import { promiseRequest } from './req';
import { RequestConfig, Response } from './type';

// @TODO update data
const getUnauthorizedData = () => ({
  error: 'Unauthorized',
  message: 'Your token has expired. Please login again.',
});

class AuthenticationConfiguration {
  private rootPrivateKey: string | undefined;
  setPrivateKey = (privateKey: string) => {
    this.rootPrivateKey = privateKey;
  };
  getAuthorization = (data: any): string => {
    if (this.rootPrivateKey === undefined) {
      throw new Error('privateKey needed');
    }
    const keyNode = Clutch.keyNode(this.rootPrivateKey, extendedKeyPath(ETHEREUM));
    const timestampInMs = `${Date.now()}`;
    console.log(data, timestampInMs);
    let dataStr;
    if (typeof data === 'string') {
      dataStr = data;
    } else {
      dataStr = JSON.stringify(data, null, 0);
    }
    return Clutch.signMessageByExtendedKeyPair(keyNode, dataStr, timestampInMs);
  };
}

// TODO: setPrivateKey should be called when pkey is reconstructed
//  ex) authenticationConfiguration.setPrivateKey(pkey.privKey.toString('hex', 64));
export const authenticationConfiguration = new AuthenticationConfiguration();

const HEADER_X_HMAC_SIG = 'x-hmac-sig';

// @TODO refresh
const tokenExpiredCallback = async () => {
  return {} as Response<any>;
};

const authRequest =
  (method: Method) =>
  async <D = any>(endpoint: string, reqConfig: RequestConfig = {}): Promise<Response<D>> => {
    reqConfig.headers = {
      ...reqConfig.headers,
      [HEADER_X_HMAC_SIG]: authenticationConfiguration.getAuthorization(reqConfig.data),
    };

    const res = await promiseRequest(method)(endpoint, reqConfig);

    if (res.status === 401) {
      const refreshRes = await tokenExpiredCallback();

      if (refreshRes.ok) {
        reqConfig.headers[HEADER_X_HMAC_SIG] = authenticationConfiguration.getAuthorization(reqConfig.data);

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
