import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { WalletDto } from '@@domain/model/WalletDto';
import { useDi } from '@@hooks/useDi';

export default function useWalletsQuery(options: UseQueryOptions<WalletDto[], unknown, WalletDto[]> = {}) {
  const walletService = useDi('WalletService');
  return useQuery<WalletDto[], unknown, WalletDto[]>(['wallets'], () => walletService.getWalletList(), options);
}
