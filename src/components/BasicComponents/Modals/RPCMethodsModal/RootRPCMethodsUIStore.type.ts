export interface IRpcUiMethodsStoreState {
  transaction: any;
  dappTransactionModalVisible: boolean;
  approveModalVisible: boolean;
}

export interface IRpcUiMethodsStore extends IRpcUiMethodsStoreState {
  setTransaction: (transaction: any) => void;
  resetTransaction: () => void;
  resetState: () => void;
  toggleDappTransactionModal: () => void;
  toggleApproveModal: () => void;
}
