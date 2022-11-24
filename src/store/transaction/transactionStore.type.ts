import { TransactionRequest } from '@ethersproject/abstract-provider';

export interface ITransactionStore extends TransactionRequest {
  setState: (newState: TransactionRequest) => void;
  resetStore: () => void;
}
