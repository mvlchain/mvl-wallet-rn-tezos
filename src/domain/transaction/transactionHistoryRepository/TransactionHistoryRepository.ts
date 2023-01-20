import qs from 'qs';
import { inject, injectable } from 'tsyringe';

import appconfig from '@@config/appconfig';
import { RefreshTransactionResponseDto } from '@@generated/generated-scheme-clutch';
import { request } from '@@utils/request';

import { ITransactionHistoryRepository, IGetHistoryParams, IRegisterTransactionRequest, IHistoryParams } from './TransactionHistoryRepository.type';
@injectable()
export class TransactionHistoryRepository implements ITransactionHistoryRepository {
  constructor() {}

  getHistory = async (params: IGetHistoryParams) => {
    try {
      const endpoint = `/v1/wallets/transactions?${qs.stringify(params)}`;
      const res = await request.get(endpoint);
      if (res.status === 200) {
        return res.data;
      } else {
        return [];
      }
    } catch (e) {
      return [];
    }
  };

  getSingleHistory = async (params: IHistoryParams) => {
    const endpoint = `/v1/transactions?${qs.stringify(params)}`;
    const res = await request.get<RefreshTransactionResponseDto>(endpoint);
    return res.data;
  };

  refreshHistory = async (params: IHistoryParams) => {
    const endpoint = `/v1/transactions/refresh?${qs.stringify(params)}`;
    const res = await request.get<RefreshTransactionResponseDto>(endpoint);
    return res.data;
  };

  registerHistory = async (params: IRegisterTransactionRequest) => {
    try {
      const authConfig = appconfig().auth;
      const basicCredential = `${authConfig.basic.username}:${authConfig.basic.password}`;
      const encoded = new Buffer(basicCredential, 'utf8').toString('base64');
      const endpoint = `/v1/wallets/transactions`;
      const res = await request.post(endpoint, {
        headers: {
          Authorization: `Basic ${encoded}`,
        },
        data: params,
      });
      if (res.status === 201) {
        return res.data;
      } else {
        return [];
      }
    } catch (e) {
      return [];
    }
  };
}
