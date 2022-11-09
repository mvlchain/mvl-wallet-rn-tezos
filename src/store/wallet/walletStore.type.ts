import { IPersistWallet } from './walletPersistStore.type';

export interface IWallet extends IWalletState {
  setWalletData: (wallets: IWalletData[]) => void;
}

export interface IWalletState {
  walletData: IWalletData[];
}

export interface IWalletData extends IPersistWallet {
  address: string;
  privateKey: string;
}
