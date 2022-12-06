import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { getNetworkConfig, Network } from '@@constants/network.constant';
import { WalletDto } from '@@domain/model/WalletDto';
import { useDi } from '@@hooks/useDi';

export default function useWalletsQuery(network: Network, options: UseQueryOptions<WalletDto[], unknown, WalletDto[]> = {}) {
  const walletService = useDi('WalletService');
  const networkId = getNetworkConfig(network).networkId;
  return useQuery<WalletDto[], unknown, WalletDto[]>(createKey(network), () => walletService.getWalletList(networkId), options);
}

const createKey = (network: Network) => ['wallets', network];
useWalletsQuery.createKey = createKey;
