import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { Network, NetworkId } from '@@constants/network.constant';
import { IGetTransactionHistoryResponse } from '@@domain/transaction/TransactionService.type';
import { useDi } from '@@hooks/useDi';

export default function useTransactionHistoryQuery(
  {
    network,
    ticker,
    address,
    beforeblock,
    beforeindex,
    limit,
  }: { network: NetworkId; ticker: string; address: string | null; beforeblock?: number; beforeindex?: number; limit?: number },
  options: UseQueryOptions<IGetTransactionHistoryResponse[], unknown, IGetTransactionHistoryResponse[]> = {}
) {
  const transactionService = useDi('TransactionService');
  return useQuery<IGetTransactionHistoryResponse[], unknown, IGetTransactionHistoryResponse[]>(
    ['history', address, network, ticker],
    () => {
      if (!address) return [];
      return transactionService.getHistory({ address, network, ticker, beforeblock, beforeindex, limit });
    },
    options
  );
}
