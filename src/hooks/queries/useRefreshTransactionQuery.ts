import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { IHistoryParams } from '@@domain/transaction/TransactionService.type';
import { RefreshTransactionResponseDto } from '@@generated/generated-scheme-clutch';
import { useDi } from '@@hooks/useDi';

export default function useRefreshTransactionQuery(
  param: IHistoryParams,
  options: UseQueryOptions<RefreshTransactionResponseDto, unknown, RefreshTransactionResponseDto> = {}
) {
  const transactionService = useDi('TransactionService');
  return useQuery<RefreshTransactionResponseDto, unknown, RefreshTransactionResponseDto>(
    createKey(param),
    () => transactionService.refreshHistory(param),
    options
  );
}

const createKey = (param: IHistoryParams) => ['refreshTransaction', param.network, param.hash];
useRefreshTransactionQuery.createKey = createKey;
