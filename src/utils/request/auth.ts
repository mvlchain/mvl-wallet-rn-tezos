import { Method } from 'axios';

import { promiseRequest } from './req';
import { RequestConfig, Response } from './type';

// @TODO update data
const getUnauthorizedData = () => ({
  error: 'Unauthorized',
  message: 'Your token has expired. Please login again.',
});

// @TODO return auth token
const getAuthorization = () => 'Auth Token';

// @TODO refresh
const tokenExpiredCallback = async () => {
  return {} as Response<any>;
};

const authRequest =
  (method: Method) =>
  async <D = any>(endpoint: string, reqConfig: RequestConfig = {}): Promise<Response<D>> => {
    reqConfig.headers = { ...reqConfig.headers, Authorization: getAuthorization() };

    const res = await promiseRequest(method)(endpoint, reqConfig);

    if (res.status === 401) {
      const refreshRes = await tokenExpiredCallback();

      if (refreshRes.ok) {
        reqConfig.headers.Authorization = getAuthorization();

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
