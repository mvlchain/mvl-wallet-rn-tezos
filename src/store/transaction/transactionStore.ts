import create from 'zustand';
import { devtools } from 'zustand/middleware';

import { ITransactionStore } from './transactionStore.type';

export const transactionStore = create<ITransactionStore>()(
  devtools(
    (set, get) => ({
      setState: (newState) => {
        set(
          (prevState) => ({
            ...prevState,
            ...newState,
          }),
          false,
          //@ts-ignore
          `transactionStore-setState-${JSON.stringify(newState)}`
        );
      },
      resetStore: () => {
        set((prevState) => ({
          setState: prevState.setState,
          resetStore: prevState.resetStore,
        })),
          false,
          'reset transaction store';
      },
    }),
    { name: 'transactionStore', enabled: __DEV__ }
  )
);
