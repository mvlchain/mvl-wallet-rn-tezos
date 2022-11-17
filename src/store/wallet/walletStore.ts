import create from 'zustand';
import { devtools } from 'zustand/middleware';

import { WalletDto } from '@@domain/model/WalletDto';

import * as Type from './walletStore.type';

const INITIAL_WALLET_STATE: Type.IWalletState = {
  walletData: [],
};

export const walletStore = create<Type.IWallet>()(
  devtools(
    (set) => ({
      ...INITIAL_WALLET_STATE,
      setWalletData: (wallets: WalletDto[]) => {
        set(() => ({ walletData: wallets }), false, `setWalletData`);
      },
    }),
    { name: 'walletStore', enabled: __DEV__ }
  )
);
