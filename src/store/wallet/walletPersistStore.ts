import AsyncStorage from '@react-native-async-storage/async-storage';
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import * as Type from './walletPersistStore.type';

const initState: Type.IWalletPersistState = {
  walletList: [
    { index: 0, name: 'Wallet 1' },
    { index: 1, name: 'Wallet 2' },
  ],
  selectedWalletIndex: 0,
};

const walletPersistStore = create<Type.IWalletPersist>()(
  devtools(
    persist(
      (set) => ({
        ...initState,
        createWallet: () =>
          set(
            (state) => ({
              walletList: [
                ...state.walletList,
                {
                  index: state.walletList.length,
                  name: `Wallet ${state.walletList.length + 1}`,
                },
              ],
            }),
            false,
            'createWallet'
          ),
        selectWallet: (index: number) => set(() => ({ selectedWalletIndex: index }), false, 'selectWallet'),
        removeWallet: () => set(() => ({ walletList: [{ index: 0, name: 'Wallet 1' }] }), false, 'removeWallet'),
      }),
      {
        name: 'walletPersist',
        getStorage: () => AsyncStorage,
      }
    ),
    { name: 'walletPersistStore', enabled: __DEV__ }
  )
);

export default walletPersistStore;
