import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { Network } from '@@constants/network.constant';
import { CURRENCY } from '@@constants/setting.constant';
import { IGetPriceDto, IGetPriceResponseDto } from '@@domain/wallet/repositories/WalletRepository.type';
import { useDi } from '@@hooks/useDi';

export interface IPriceQueryKey {
  network: Network;
  currency: keyof typeof CURRENCY;
}

export default function usePriceQuery(param: IGetPriceDto, options: UseQueryOptions<IGetPriceResponseDto, unknown, IGetPriceResponseDto> = {}) {
  const walletRepository = useDi('WalletRepository');
  return useQuery<IGetPriceResponseDto, unknown, IGetPriceResponseDto>(createKey(param), () => walletRepository.getPrice(param), options);
}

const createKey = (key: IGetPriceDto) => ['price', key.ids, key.vsCurrencies];
usePriceQuery.createKey = createKey;
