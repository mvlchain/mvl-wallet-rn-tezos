import { Network } from '@@constants/network.constant';

export interface IWalletPersist extends IWalletPersistState {
  initWallet: () => void;
  selectWallet: (index: number) => void;
  selectNetwork: (network: Network) => void;
  setWallets: (wallets: IPersistWallet[]) => void;
  editWalletName: (wallet: IPersistWallet, network: Network) => void;
  createWallet: () => void;
}

export interface IWalletPersistState {
  selectedWalletIndex: number;
  selectedNetwork: Network;
  walletList: { [network: string]: IPersistWallet[] };
}

export interface IPersistWallet {
  index: number;
  name: string;
}
