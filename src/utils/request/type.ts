import { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface RequestConfig extends AxiosRequestConfig {
  contentType?: any;
}

export interface Response<T = any> extends AxiosResponse<T> {
  ok: boolean;
}
