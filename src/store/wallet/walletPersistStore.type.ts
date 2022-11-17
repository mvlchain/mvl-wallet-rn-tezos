import { Network } from '@@constants/network.constant';

export interface IWalletPersist extends IWalletPersistState {
  initWallet: () => void;
  selectWallet: (index: number) => void;
  selectNetwork: (network: Network) => void;
}

export interface IWalletPersistState {
  selectedWalletIndex: number;
  selectedNetwork: Network;
}
