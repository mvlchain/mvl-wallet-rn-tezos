import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { Network, getNetworkConfig, NETWORK_FEE_TYPE } from '@@constants/network.constant';
import { IGetTransactionHistoryResponse } from '@@domain/transaction/TransactionService.type';
import { useDi } from '@@hooks/useDi';
import walletPersistStore from '@@store/wallet/walletPersistStore';

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
  //TODO: 나중에 네트워크 파악하는건 트랜잭션레파지토리 만들면서 서비스로 넣기
  const transactionService = useDi('TransactionService');
  return useQuery<IGetTransactionHistoryResponse[], unknown, IGetTransactionHistoryResponse[]>(
    ['history', address, network, ticker],
    () => transactionService.getHistory({ address, network, ticker, beforeblock, beforeindex, limit }),
    options
  );
}
