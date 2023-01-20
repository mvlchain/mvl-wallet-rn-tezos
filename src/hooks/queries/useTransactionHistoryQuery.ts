import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { Network, NetworkId } from '@@constants/network.constant';
import { IGetTransactionHistoryResponse } from '@@domain/transaction/transactionHistoryRepository/TransactionHistoryRepository.type';
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
  const transactionHistoryRepository = useDi('TransactionHistoryRepository');
  return useQuery<IGetTransactionHistoryResponse[], unknown, IGetTransactionHistoryResponse[]>(
    ['history', address, network, ticker],
    () => {
      if (!address) return [];
      return transactionHistoryRepository.getHistory({ address, network, ticker, beforeblock, beforeindex, limit });
    },
    options
  );
}
