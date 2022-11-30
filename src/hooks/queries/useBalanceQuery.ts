import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { Network } from '@@constants/network.constant';
import { IBalance } from '@@domain/wallet/services/WalletBlockChainService.type';
import { BalanceResponseDto } from '@@generated/generated-scheme';
import { useDi } from '@@hooks/useDi';

export default function useBalanceQuery(address: string, network: Network, options: UseQueryOptions<BalanceResponseDto[], unknown, IBalance> = {}) {
  const WalletRepository = useDi('WalletRepository');
  return useQuery<BalanceResponseDto[], unknown, IBalance>(createKey(address, network), () => WalletRepository.getBalance(address, network), options);
}

const createKey = (address: string, network: Network) => ['balance', address, network];
useBalanceQuery.createKey = createKey;
