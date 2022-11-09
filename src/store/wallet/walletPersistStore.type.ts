export interface IWalletPersist extends IWalletPersistState {
  initWallet: (postboxKey: string) => void;
  createWallet: (postboxKey: string) => void;
  selectWallet: (postboxkey: string, index: number) => void;
}

export interface IWalletPersistState {
  walletList: IUserWalletList;
  selectedWalletIndex: IUserSelectWalletIndex;
}

export interface IUserWalletList {
  [key: string]: IPersistWallet[];
}

export interface IUserSelectWalletIndex {
  [key: string]: number;
}

export interface IPersistWallet {
  index: number;
  name: string;
}
