import { IGetTransactionHistoryResponse } from '@@domain/transaction/TransactionService.type';

export interface ITokenHistory {
  history: Array<IGetTransactionHistoryResponse>;
  beforeblock: number;
  beforeindex: number;
}

export interface ITokens {
  [prop: string]: ITokenHistory | undefined;
}
export interface ITransactionHistoryStore {
  tokens: ITokens;
  setHistory(token: string, history: Array<IGetTransactionHistoryResponse>, beforeblock: number, beforeindex: number): void;
}
