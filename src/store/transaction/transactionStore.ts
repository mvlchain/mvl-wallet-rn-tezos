import produce from 'immer';
import create from 'zustand';
import { devtools } from 'zustand/middleware';

import { ITransactionService, ITransaction, IFetchTransactionHistoryResponse } from '@@domain/transaction/TransactionService.type';

import { ITransactionStore } from './transactionStore.type';

const transactionStore = create<ITransactionStore>()(
  devtools(
    (set, get) => ({
      tokens: {},
      setHistory: (token: string, history: Array<IFetchTransactionHistoryResponse>, beforeblock: number, beforeindex: number) => {
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
          })
        );
      },
    }),
    { name: 'transactionStore', enabled: __DEV__ }
  )
);
export default transactionStore;
