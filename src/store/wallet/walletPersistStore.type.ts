import { Network } from '@@constants/network.constant';
import { TokenDto } from '@@store/token/tokenPersistStore.type';

export interface IWalletPersist extends IWalletPersistState {
  initWallet: () => void;
  selectWallet: (index: number) => void;
  selectNetwork: (network: Network) => void;
  setWallets: (network: Network, wallets: IPersistWallet[]) => void;
  editWalletName: (wallet: IPersistWallet, network: Network) => void;
  createWallet: (network: Network) => void;
  addReceiveHistory: (network: Network, token: TokenDto, amount: string, cacheQR: string) => void;
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
  amount: string;
  cacheQR: string;
}
