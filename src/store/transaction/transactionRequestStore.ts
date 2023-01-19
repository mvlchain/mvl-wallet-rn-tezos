import zustandFlipper from 'react-native-flipper-zustand';
import create from 'zustand';

import { ITransactionRequestStore } from './transactionRequestStore.type';

const INITIAL_TRANSACTION_REQUEST_BODY_STATE = {
  to: null,
  from: null,
  data: null,
  tokenTo: null,
  tokenValue: null,
  value: null,
  toValid: false,
  valueValid: false,
  transferParam: null, //only for tezos
  //테조스의 경우 토큰을 전송할때 to,value,가 아니라
  //특정양식에 맞춰 만들어진 TransferParam을 전송해야한다.
};
export const transactionRequestStore = create<ITransactionRequestStore>(
  zustandFlipper(
    (set) => ({
      ...INITIAL_TRANSACTION_REQUEST_BODY_STATE,
      setState: (newState) => {
        set(
          (prevState) => ({
            ...prevState,
            ...newState,
          }),
          false,
          `setState`
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
