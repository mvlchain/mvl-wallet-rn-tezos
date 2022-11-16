import { IFetchTransactionHistoryResponse, ITransaction } from '@@domain/transaction/TransactionService.type';
export type TTransactionStoreState = Record<string, Array<ITransaction>>;

export interface ITransactionStore {
  setHistory: (token: string, history: Array<IFetchTransactionHistoryResponse>, beforeblock: number, beforeindex: number) => void;
}
