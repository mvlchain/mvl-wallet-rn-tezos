import { IGetTransactionHistoryResponse, ITransaction } from '@@domain/transaction/TransactionService.type';

export interface ITokenHistory {
  history: Array<IGetTransactionHistoryResponse>;
  beforeblock: number;
  beforeindex: number;
}

export interface ITokens {
  [prop: string]: ITokenHistory | undefined;
}
export interface ITransactionStore {
  tokens: ITokens;
  setHistory(token: string | symbol, history: Array<IGetTransactionHistoryResponse>, beforeblock: number, beforeindex: number): void;
}
