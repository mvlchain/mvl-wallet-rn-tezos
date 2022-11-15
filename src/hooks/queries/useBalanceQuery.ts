import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { Network } from '@@constants/network.constant';
import { BalanceResponseDto } from '@@generated/generated-scheme';
import { useDi } from '@@hooks/common/useDi';

export default function useBalanceQuery(
  address: string,
  network: Network,
  options: UseQueryOptions<BalanceResponseDto[], unknown, BalanceResponseDto[]> = {}
) {
  const WalletRepository = useDi('WalletRepository');
  return useQuery<BalanceResponseDto[], unknown, BalanceResponseDto[]>(
    createKey(address, network),
    () => WalletRepository.getBalance(address, network),
    options
  );
}

const createKey = (address: string, network: Network) => ['balance', address, network];
useBalanceQuery.createKey = createKey;
