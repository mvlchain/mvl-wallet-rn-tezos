import create from 'zustand';
import { devtools } from 'zustand/middleware';

import { ITransactionRequestStore } from './transactionRequestStore.type';

const INITIAL_TRANSACTION_REQUEST_BODY_STATE = {
  to: null,
  from: null,
  nonce: null,
  gasLimit: null,
  gasPrice: null,
  data: null,
  value: null,
  chainId: null,
  type: null,
  accessList: null,
  maxPriorityFeePerGas: null,
  maxFeePerGas: null,
  customData: null,
  ccipReadEnabled: null,
};
export const transactionRequestStore = create<ITransactionRequestStore>()(
  devtools(
    (set, get) => ({
      ...INITIAL_TRANSACTION_REQUEST_BODY_STATE,
      setBody: (newState) => {
        set(
          (prevState) => ({
            ...prevState,
            ...newState,
          }),
          false,
          `setBody`
        );
      },
      resetBody: () => {
        set(
          (prevState) => ({
            ...prevState,
            ...INITIAL_TRANSACTION_REQUEST_BODY_STATE,
          }),
          false,
          'resetBody'
        );
      },
    }),
    { name: 'transactionStore', enabled: __DEV__ }
  )
);
