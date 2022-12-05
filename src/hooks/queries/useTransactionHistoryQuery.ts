import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { Network } from '@@constants/network.constant';
import { IGetTransactionHistoryResponse } from '@@domain/transaction/TransactionService.type';
import { useDi } from '@@hooks/useDi';

export default function useTransactionHitoryQuery(
  {
    network,
    ticker,
    address,
    beforeblock,
    beforeindex,
    limit,
  }: { network: Network; ticker: string; address: string; beforeblock?: number; beforeindex?: number; limit?: number },
  options: UseQueryOptions<IGetTransactionHistoryResponse[], unknown, IGetTransactionHistoryResponse[]> = {}
) {
  const transactionService = useDi('TransactionService');
  return useQuery<IGetTransactionHistoryResponse[], unknown, IGetTransactionHistoryResponse[]>(
    ['history', address, network, ticker],
    () => transactionService.getHistory({ address, network, ticker, beforeblock, beforeindex, limit }),
    options
  );
}
