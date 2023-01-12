import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { Network } from '@@constants/network.constant';
import { SpenderResponseDto } from '@@generated/generated-scheme-clutch';
import { useDi } from '@@hooks/useDi';

export default function useSpenderQuery(network: Network, options: UseQueryOptions<SpenderResponseDto[], unknown, SpenderResponseDto[]> = {}) {
  const TradeRepository = useDi('TradeRepository');
  return useQuery<SpenderResponseDto[], unknown, SpenderResponseDto[]>(createKey(network), () => TradeRepository.getSpender(network), options);
}

const createKey = (network: Network) => ['spender', network];
useSpenderQuery.createKey = createKey;
