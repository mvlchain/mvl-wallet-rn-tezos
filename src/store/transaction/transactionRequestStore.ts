import zustandFlipper from 'react-native-flipper-zustand';
import create from 'zustand';

import { ITransactionRequestStore } from './transactionRequestStore.type';

const INITIAL_TRANSACTION_REQUEST_BODY_STATE = {
  to: null,
  from: null,
  data: null,
  value: null,
};
export const transactionRequestStore = create<ITransactionRequestStore>()(
  zustandFlipper(
    (set) => ({
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
    'transactionStore'
  )
);
