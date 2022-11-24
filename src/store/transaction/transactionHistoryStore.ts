import produce from 'immer';
import create from 'zustand';
import { devtools } from 'zustand/middleware';

import { ITransactionService, ITransaction, IGetTransactionHistoryResponse } from '@@domain/transaction/TransactionService.type';

import { ITransactionHistoryStore } from './transactionHistoryStore.type';

const transactionHistoryStore = create<ITransactionHistoryStore>()(
  devtools(
    (set, get) => ({
      tokens: {},
      setHistory: (token: string, history: Array<IGetTransactionHistoryResponse>, beforeblock: number, beforeindex: number) => {
        set(
          produce((state) => {
            if (!state.tokens[token]) {
              state.tokens[token] = {
                beforeblock,
                beforeindex,
                history,
              };
            } else {
              state.tokens[token].history.concat(history);
              state.tokens[token].beforeblock = beforeblock;
              state.tokens[token].beforeindex = beforeindex;
            }
            return state;
          }),
          false,
          'set transaction history'
        );
      },
    }),
    { name: 'transactionHistoryStore', enabled: __DEV__ }
  )
);
export default transactionHistoryStore;
