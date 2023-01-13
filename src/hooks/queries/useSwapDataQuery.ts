import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { Network } from '@@constants/network.constant';
import { ISwapDto } from '@@domain/trade/repositories/tradeRepository.type';
import { SpenderResponseDto, CreateNativeSwapTransactionResponseDto } from '@@generated/generated-scheme-clutch';
import { useDi } from '@@hooks/useDi';

export default function useSwapDataQuery(
  network: Network,
  swapDto: ISwapDto | null,
  options: UseQueryOptions<CreateNativeSwapTransactionResponseDto | null, unknown, CreateNativeSwapTransactionResponseDto | null> = {}
) {
  const TradeRepository = useDi('TradeRepository');
  return useQuery<CreateNativeSwapTransactionResponseDto | null, unknown, CreateNativeSwapTransactionResponseDto | null>(
    createKey(network, swapDto),
    () => {
      if (!swapDto) return null;
      return TradeRepository.swap(network, swapDto);
    },
    options
  );
}

const createKey = (network: Network, swapDto: ISwapDto | null) => ['spender', network, swapDto];
useSwapDataQuery.createKey = createKey;
