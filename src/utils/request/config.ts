import axios, { AxiosRequestConfig } from 'axios';
import QueryString from 'qs';

import { formatResponse, formatError } from './format';

function extend(target: { [key in any]: any }, ...arg: Array<{ [key in any]: any }>) {
  for (let i = 1; i < arguments.length; ++i) {
    const from = arguments[i];

    if (typeof from !== 'object') continue;

    for (let j in from) {
      if (from.hasOwnProperty(j)) {
        target[j] = typeof from[j] === 'object' ? extend({}, target[j], from[j]) : from[j];
      }
    }
  }

  return target;
}

export const setDefaultConfig = () => {
  const defaultParamsSerializer = (params: any) => QueryString.stringify(params, { arrayFormat: 'repeat' });

  axios.defaults.headers.common['Content-Type'] = 'application/json';
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  axios.defaults.headers.put['Content-Type'] = 'application/json';
  axios.defaults.paramsSerializer = defaultParamsSerializer;
  axios.interceptors.response.use(formatResponse, formatError);
  axios.defaults.timeout = 30 * 1000;
};

export const setAxiosConfig = (config: AxiosRequestConfig) => {
  extend(axios.defaults, config);
};
