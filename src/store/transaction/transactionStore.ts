import create from 'zustand';
import { devtools } from 'zustand/middleware';

import { ITransactionService, ITransaction } from '@@domain/transaction/TransactionService.type';

import { ITransactionStore, TTransactionStoreState } from './transactionStore.type';

const transactionStore = create<ITransactionStore | TTransactionStoreState>()(
  devtools(
    (set, get) => ({
      setHistory: (token: string, history: Array<ITransaction>) => {
        //@ts-ignore
        const old = get()[token] ? get()[toekn] : [];
        set(
          {
            [token]: [...old, ...history],
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
