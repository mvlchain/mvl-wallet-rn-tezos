import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { NetworkId } from '@@constants/network.constant';
import { IBalance } from '@@domain/wallet/services/WalletBlockChainService.type';
import { BalanceResponseDto } from '@@generated/generated-scheme';
import { useDi } from '@@hooks/useDi';

export default function useBalanceQuery(
  address: string,
  networkId: NetworkId,
  options: UseQueryOptions<BalanceResponseDto[], unknown, IBalance> = {}
) {
  const WalletRepository = useDi('WalletRepository');
  return useQuery<BalanceResponseDto[], unknown, IBalance>(
    createKey(address, networkId),
    () => WalletRepository.getBalance(address, networkId),
    options
  );
}

const createKey = (address: string, networkId: NetworkId) => ['balance', address, networkId];
useBalanceQuery.createKey = createKey;
