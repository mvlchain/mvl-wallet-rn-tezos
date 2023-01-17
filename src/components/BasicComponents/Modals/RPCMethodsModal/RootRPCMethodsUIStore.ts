import zustandFlipper from 'react-native-flipper-zustand';
import create from 'zustand';

import { IRpcUiMethodsStore, IRpcUiMethodsStoreState } from './RootRPCMethodsUIStore.type';

const INITIAL_RPC_METHODS_UI_STORE_STATE = {
  transaction: null,
  dappTransactionModalVisible: false,
  approveModalVisible: false,
};
const rpcMethodsUiStore = create<IRpcUiMethodsStore>(
  zustandFlipper(
    (set, get) => ({
      ...INITIAL_RPC_METHODS_UI_STORE_STATE,
      setTransaction: (transaction) => {
        set(
          (prevState) => ({
            ...prevState,
            transaction,
          }),
          false,
          `setTransaction`
        );
      },
      resetTransaction: () => {
        set(
          (prevState) => ({
            ...prevState,
            transaction: null,
          }),
          false,
          `resetTransaction`
        );
      },
      resetState: () => {
        set(
          (prevState) => ({
            ...prevState,
            ...INITIAL_RPC_METHODS_UI_STORE_STATE,
          }),
          false,
          'resetRpcMethodsUiStore'
        );
      },
      toggleDappTransactionModal: () => {
        set(
          (prevState) => ({
            ...prevState,
            dappTransactionModalVisible: !prevState.dappTransactionModalVisible,
          }),
          false,
          `toggleDappTransactionModal`
        );
      },
      toggleApproveModal: () => {
        set(
          (prevState) => ({
            ...prevState,
            approveModalVisible: !prevState.approveModalVisible,
          }),
          false,
          `toggleApproveModal`
        );
      },
    }),
    'rpcMethodsUiStore'
  )
);
export default rpcMethodsUiStore;
