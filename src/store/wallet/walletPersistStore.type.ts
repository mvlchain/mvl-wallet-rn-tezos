export interface IWalletPersist extends IWalletPersistState {
  createWallet: () => void;
  selectWallet: (index: number) => void;
  removeWallet: () => void;
}

export interface IWalletPersistState {
  walletList: IPersistWallet[];
  selectedWalletIndex: number;
}

export interface IPersistWallet {
  index: number;
  name: string;
}
