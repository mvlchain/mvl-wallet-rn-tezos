export interface IWalletPersist extends IWalletPersistState {
  initWallet: (postboxKey: string) => void;
  selectWallet: (postboxkey: string, index: number) => void;
}

export interface IWalletPersistState {
  selectedWalletIndex: IUserSelectWalletIndex;
}
export interface IUserSelectWalletIndex {
  [key: string]: number;
}
