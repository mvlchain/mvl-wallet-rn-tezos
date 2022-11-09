import AsyncStorage from '@react-native-async-storage/async-storage';
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import * as Type from './walletPersistStore.type';

const initState: Type.IWalletPersistState = {
  walletList: {},
  selectedWalletIndex: {},
};

const walletPersistStore = create<Type.IWalletPersist>()(
  devtools(
    persist(
      (set) => ({
        ...initState,
        initWallet: (postboxKey: string) =>
          set((state) => ({
            walletList: { ...state?.walletList, [postboxKey]: [{ index: 0, name: 'Wallet 1' }] },
            selectedWalletIndex: {
              ...state.selectedWalletIndex,
              [postboxKey]: 0,
            },
          })),
        createWallet: (postboxKey: string) =>
          set(
            (state) => ({
              walletList: {
                ...state?.walletList,
                [postboxKey]: [
                  // eslint-disable-next-line no-unsafe-optional-chaining
                  ...state?.walletList[postboxKey],
                  {
                    index: state.walletList[postboxKey]?.length,
                    name: `Wallet ${state.walletList[postboxKey].length + 1}`,
                  },
                ],
              },
            }),
            false,
            'createWallet'
          ),
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
