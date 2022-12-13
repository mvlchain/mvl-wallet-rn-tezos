import zustandFlipper from 'react-native-flipper-zustand';
import create from 'zustand';

import { WalletDto } from '@@domain/model/WalletDto';

import * as Type from './walletStore.type';

const INITIAL_WALLET_STATE: Type.IWalletState = {
  walletData: [],
};

export const walletStore = create<Type.IWallet>(
  zustandFlipper(
    (set) => ({
      ...INITIAL_WALLET_STATE,
      setWalletData: (wallets: WalletDto[]) => {
        set(() => ({ walletData: wallets }), false, `setWalletData`);
      },
    }),
    'walletStore'
  )
);
