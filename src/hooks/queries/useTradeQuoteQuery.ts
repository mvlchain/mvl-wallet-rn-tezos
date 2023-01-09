import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { Network } from '@@constants/network.constant';
import { IQuoteDto } from '@@domain/trade/repositories/tradeRepository.type';
import { FetchPriceResponseDto } from '@@generated/generated-scheme-clutch';
import { useDi } from '@@hooks/useDi';

export default function useTradeQuoteQuery(
  network: Network,
  quoteDto: IQuoteDto | null,
  options: UseQueryOptions<FetchPriceResponseDto, unknown, FetchPriceResponseDto> = {}
) {
  const TradeRepository = useDi('TradeRepository');
  return useQuery<FetchPriceResponseDto, unknown, FetchPriceResponseDto>(
    createKey(network, quoteDto),
    () => TradeRepository.quote(network, quoteDto),
    options
  );
}

const createKey = (network: Network, quoteDto: IQuoteDto | null) => ['tradeQuote', network, quoteDto];
useTradeQuoteQuery.createKey = createKey;
