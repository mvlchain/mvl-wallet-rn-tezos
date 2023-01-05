import { Network } from '@ethersproject/networks';
import qs from 'qs';
import { injectable } from 'tsyringe';

import { BroadcastTransactionDto, SpenderResponseDto, TokensResponseDto } from '@@generated/generated-scheme-clutch';
import { request } from '@@utils/request';

import { IQuoteDto, ISwapDto } from './tradeRepository.type';

export interface ITradeRepository {}

@injectable()
export class TradeRepository implements ITradeRepository {
  constructor() {}

  getSpender = async (network: Network) => {
    const endpoint = `v1/native-swap/${network}/approve/spender`;
    const res = await request.get<SpenderResponseDto[]>(endpoint);
    return res.data;
  };

  getTokens = async (network: Network) => {
    const endpoint = `v1/native-swap/${network}/tokens`;
    const res = await request.get<TokensResponseDto[]>(endpoint);
    return res.data;
  };

  quote = async (network: Network, quoteDto: IQuoteDto) => {
    const endpoint = `v1/native-swap/${network}/quote?${qs.stringify({
      ...quoteDto,
    })}`;
    const res = await request.get<TokensResponseDto[]>(endpoint);
    return res.data;
  };

  swap = async (network: Network, swapDto: ISwapDto) => {
    const endpoint = `v1/native-swap/${network}/swap?${qs.stringify({
      ...swapDto,
    })}`;
    const res = await request.get<TokensResponseDto[]>(endpoint);
    return res.data;
  };

  broadcast = async (network: Network, broadcastDto: BroadcastTransactionDto) => {
    const endpoint = `v1/native-swap/${network}/broadcast`;
    const res = await request.post<TokensResponseDto[]>(endpoint, {
      data: broadcastDto,
    });
    return res.data;
  };
}
