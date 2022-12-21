import { TTransactionStatus, TTransactionType } from '@@domain/transaction/TransactionService.type';
import { TCurrency } from '@@store/setting/settingPersistStore.type';

export interface ITransactionDetailBoardProps {
  type: TTransactionType;
  value: string;
  valueSign: string;
  ticker: string;
  price: string;
  settedCurrency: TCurrency;
  updatedAt: string;
  status: TTransactionStatus;
  to: string;
}
