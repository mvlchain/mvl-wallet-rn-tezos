import { AxiosError, AxiosResponse } from 'axios';

export const formatResponse = (response: AxiosResponse) => {
  return {
    ...response,
    ok: response.statusText === 'OK' || (response.status >= 200 && response.status < 300),
  };
};

export const formatError = (error: AxiosError) => (error.response ? formatResponse(error.response) : Promise.reject(error));
