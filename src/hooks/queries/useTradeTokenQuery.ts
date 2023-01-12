import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { Network } from '@@constants/network.constant';
import { TokensResponseDto } from '@@generated/generated-scheme-clutch';
import { useDi } from '@@hooks/useDi';

export default function useTradeTokeneQuery(network: Network, options: UseQueryOptions<TokensResponseDto, unknown, TokensResponseDto> = {}) {
  const TradeRepository = useDi('TradeRepository');
  return useQuery<TokensResponseDto, unknown, TokensResponseDto>(createKey(network), () => TradeRepository.getTokens(network), options);
}

const createKey = (network: Network) => ['tradeToken', network];
useTradeTokeneQuery.createKey = createKey;
