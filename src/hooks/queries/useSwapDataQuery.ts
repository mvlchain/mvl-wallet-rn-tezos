import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { NetworkId } from '@@constants/network.constant';
import { ISwapDto } from '@@domain/trade/repositories/tradeRepository.type';
import { SpenderResponseDto, CreateNativeSwapTransactionResponseDto } from '@@generated/generated-scheme-clutch';
import { useDi } from '@@hooks/useDi';

export default function useSwapDataQuery(
  network: NetworkId,
  swapDto: ISwapDto,
  options: UseQueryOptions<CreateNativeSwapTransactionResponseDto, unknown, CreateNativeSwapTransactionResponseDto> = {}
) {
  const TradeRepository = useDi('TradeRepository');
  return useQuery<CreateNativeSwapTransactionResponseDto, unknown, CreateNativeSwapTransactionResponseDto>(
    createKey(network, swapDto),
    () => TradeRepository.swap(network, swapDto),
    options
  );
}

const createKey = (network: NetworkId, swapDto: ISwapDto) => ['spender', network, swapDto];
useSwapDataQuery.createKey = createKey;
