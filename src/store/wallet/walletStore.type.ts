import { WalletDto } from '@@domain/model/WalletDto';

import { IPersistWallet } from './walletPersistStore.type';

export interface IWallet extends IWalletState {
  setWalletData: (wallets: WalletDto[]) => void;
}

export interface IWalletState {
  walletData: WalletDto[];
}

export interface IWalletData extends IPersistWallet {
  address: string;
  privateKey: string;
}
