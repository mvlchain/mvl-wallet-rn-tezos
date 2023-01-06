import qs from 'qs';
import { injectable } from 'tsyringe';

import { Network } from '@@constants/network.constant';
import {
  BroadcastTransactionDto,
  CreateNativeSwapTransactionResponseDto,
  FetchPriceResponseDto,
  SimpleResponseDto,
  SpenderResponseDto,
  TokensResponseDto,
} from '@@generated/generated-scheme-clutch';
import { request } from '@@utils/request';

import { IQuoteDto, ISwapDto, ITradeRepository } from './tradeRepository.type';

@injectable()
export class TradeRepository implements ITradeRepository {
  constructor() {}

  getSpender = async (network: Network): Promise<SpenderResponseDto[]> => {
    const endpoint = `v1/native-swap/${network}/approve/spender`;
    const res = await request.get<SpenderResponseDto[]>(endpoint);
    return res.data;
  };

  getTokens = async (network: Network): Promise<TokensResponseDto> => {
    const endpoint = `v1.1/native-swap/${network}/tokens`;
    const res = await request.get<TokensResponseDto>(endpoint);
    console.log('res:  ', res.data);
    return res.data;
  };

  quote = async (network: Network, quoteDto: IQuoteDto): Promise<FetchPriceResponseDto> => {
    const endpoint = `v1/native-swap/${network}/quote?${qs.stringify({
      ...quoteDto,
    })}`;
    const res = await request.get<FetchPriceResponseDto>(endpoint);
    return res.data;
  };

  swap = async (network: Network, swapDto: ISwapDto): Promise<CreateNativeSwapTransactionResponseDto> => {
    const endpoint = `v1/native-swap/${network}/swap?${qs.stringify({
      ...swapDto,
    })}`;
    const res = await request.get<CreateNativeSwapTransactionResponseDto>(endpoint);
    return res.data;
  };

  broadcast = async (network: Network, broadcastDto: BroadcastTransactionDto): Promise<SimpleResponseDto> => {
    const endpoint = `v1/native-swap/${network}/broadcast`;
    const res = await request.post<SimpleResponseDto>(endpoint, {
      data: broadcastDto,
    });
    return res.data;
  };
}
