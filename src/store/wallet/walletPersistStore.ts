import AsyncStorage from '@react-native-async-storage/async-storage';
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import * as Type from './walletPersistStore.type';

const initState: Type.IWalletPersistState = {
  selectedWalletIndex: {},
};

const walletPersistStore = create<Type.IWalletPersist>()(
  devtools(
    persist(
      (set) => ({
        ...initState,
        initWallet: (postboxKey: string) =>
          set((state) => ({
            selectedWalletIndex: {
              ...state.selectedWalletIndex,
              [postboxKey]: 0,
            },
          })),
        selectWallet: (postboxkey: string, index: number) =>
          set((state) => ({ selectedWalletIndex: { ...state.selectedWalletIndex, [postboxkey]: index } }), false, 'selectWallet'),
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
