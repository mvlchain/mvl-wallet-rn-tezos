import { Network } from '@@constants/network.constant';
import { TokenDto } from '@@generated/generated-scheme-clutch';

export interface IWalletPersist extends IWalletPersistState {
  initWallet: () => void;
  selectWallet: (index: number) => void;
  selectNetwork: (network: Network) => void;
  setWallets: (network: Network, wallets: IPersistWallet[]) => void;
  editWalletName: (wallet: IPersistWallet, network: Network) => void;
  createWallet: (network: Network) => void;
  addReceiveHistory: (network: Network, token: TokenDto, address: string, amount: string) => void;
}

export interface IWalletPersistState {
  selectedWalletIndex: { [network: string]: number };
  selectedNetwork: Network;
  walletList: { [network: string]: IPersistWallet[] };
  receiveHistory: { [network: string]: IReceiveHistory[] };
}

export interface IPersistWallet {
  index: number;
  name: string;
}

export interface IReceiveHistory {
  token: TokenDto;
  address: string;
  amount: string;
}
