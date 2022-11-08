import { TRANSACTION_STATUS, TRANSACTION_TYPE } from '@@constants/transaction.constant';

export type TTransactionStatus = typeof TRANSACTION_STATUS[keyof typeof TRANSACTION_STATUS];
export type TTranscationType = typeof TRANSACTION_TYPE[keyof typeof TRANSACTION_TYPE];

export interface ITransactionHistoryListItemProps {
  type: TTranscationType;
  status: TTransactionStatus;
  //TODO: data 보고 변경필요
  date: string;
  amount: number;
  baseCurrencyAmount: number;
  baseCurrencySymbol: string;
  //TODO: data 보고 변경필요
  txHash: string;
}

export interface IAmountStyleProps {
  isCanceled: boolean;
}
