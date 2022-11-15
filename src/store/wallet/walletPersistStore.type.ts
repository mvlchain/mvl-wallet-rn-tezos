import { Network } from '@@constants/network.constant';

export interface IWalletPersist extends IWalletPersistState {
  initWallet: (postboxKey: string) => void;
  selectWallet: (postboxkey: string, index: number) => void;
  selectNetwork: (postboxkey: string, network: Network) => void;
}

export interface IWalletPersistState {
  selectedWalletIndex: IUserSelectWalletIndex;
  selectedNetwork: IUserSelectNetwork;
}
export interface IUserSelectWalletIndex {
  [key: string]: number;
}

export interface IUserSelectNetwork {
  [key: string]: Network;
}
