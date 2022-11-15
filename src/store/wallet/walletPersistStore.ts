import AsyncStorage from '@react-native-async-storage/async-storage';
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { Network, NETWORK } from '@@constants/network.constant';

import * as Type from './walletPersistStore.type';

const initState: Type.IWalletPersistState = {
  selectedWalletIndex: {},
  selectedNetwork: {},
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
            selectedNetwork: {
              ...state.selectedNetwork,
              [postboxKey]: NETWORK.ETHEREUM,
            },
          })),
        selectWallet: (postboxKey: string, index: number) =>
          set((state) => ({ selectedWalletIndex: { ...state.selectedWalletIndex, [postboxKey]: index } }), false, 'selectWallet'),
        selectNetwork: (postboxKey: string, network: Network) =>
          set(
            (state) => ({
              selectedNetwork: {
                ...state.selectedNetwork,
                [postboxKey]: network,
              },
            }),
            false,
            'selectNetwork'
          ),
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
