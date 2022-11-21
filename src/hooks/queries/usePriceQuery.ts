import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { Network } from '@@constants/network.constant';
import { CURRENCY } from '@@constants/setting.constant';
import { IGetPriceDto, IGetPriceResponseDto } from '@@domain/wallet/repositories/WalletRepository.type';
import { useDi } from '@@hooks/common/useDi';

export interface IPriceQueryKey {
  network: Network;
  currency: keyof typeof CURRENCY;
}

export default function usePriceQuery(
  key: IPriceQueryKey,
  param: IGetPriceDto,
  options: UseQueryOptions<IGetPriceResponseDto, unknown, IGetPriceResponseDto> = {}
) {
  const walletRepository = useDi('WalletRepository');
  return useQuery<IGetPriceResponseDto, unknown, IGetPriceResponseDto>(createKey(key), () => walletRepository.getPrice(param), options);
}

const createKey = (key: IPriceQueryKey) => ['price', key.network, key.currency];
usePriceQuery.createKey = createKey;
