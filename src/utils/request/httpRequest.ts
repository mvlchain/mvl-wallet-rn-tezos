import axios, { AxiosRequestConfig } from 'axios';

import { setDefaultConfig } from './config';
import { Response } from './type';

setDefaultConfig();

export const httpRequest = <T = any>(config: AxiosRequestConfig) => {
  const res: unknown = axios(config);

  return res as Response<T>;
};
