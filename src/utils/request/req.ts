import { Method } from 'axios';

import { httpRequest } from './httpRequest';
import { RequestConfig } from './type';

const getConfig = (endpoint: string, reqConfig: RequestConfig) => {
  const { contentType, ...config } = reqConfig;

  if (reqConfig.responseType === 'blob') {
    config.timeout = 3 * 60 * 1000;
  }

  if (contentType) {
    config.headers && (config.headers['Content-Type'] = contentType);
  }

  config.url = endpoint;

  return config;
};

export const promiseRequest =
  (method: Method) =>
  async (endpoint: string, reqConfig: RequestConfig = {}) => {
    reqConfig.method = method;

    const config = getConfig(endpoint, reqConfig);

    const res = await httpRequest(config);

    if (reqConfig.responseType === 'blob' && res.status >= 400) {
      res.data = await new Response(res.data).text();
    }

    return res;
  };

export const request = {
  get: promiseRequest('get'),
  post: promiseRequest('post'),
  put: promiseRequest('put'),
  delete: promiseRequest('delete'),
} as const;
