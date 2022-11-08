import { TRANSACTION_HISTORY_FILTER_CRITERIA } from '@@constants/transaction.constant';

export type TTransactionHistroryFilter = typeof TRANSACTION_HISTORY_FILTER_CRITERIA[keyof typeof TRANSACTION_HISTORY_FILTER_CRITERIA];
