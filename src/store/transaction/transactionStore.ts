import create from 'zustand';
import { devtools } from 'zustand/middleware';

import { ITransactionService, ITransaction, IFetchTransactionHistoryResponse } from '@@domain/transaction/TransactionService.type';

import { ITransactionStore, TTransactionStoreState } from './transactionStore.type';

const transactionStore = create<ITransactionStore | TTransactionStoreState>()(
  devtools(
    (set, get) => ({
      setHistory: (token: string, history: Array<IFetchTransactionHistoryResponse>, beforeblock: number, beforeindex: number) => {
        //@ts-ignore
        const old = get()[token] ? get()[token].history : [];
        set(
          {
            [token]: {
              beforeblock,
              beforeindex,
              history: [...old, ...history],
            },
          },
          false,
          'setHistory'
        );
      },
    }),
    { name: 'transactionStore', enabled: __DEV__ }
  )
);

export default transactionStore;
