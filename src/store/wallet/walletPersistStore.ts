import AsyncStorage from '@react-native-async-storage/async-storage';
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { Network, NETWORK } from '@@constants/network.constant';

import * as Type from './walletPersistStore.type';

const initState: Type.IWalletPersistState = {
  selectedWalletIndex: 0,
  selectedNetwork: NETWORK.ETHEREUM,
};

const walletPersistStore = create<Type.IWalletPersist>()(
  devtools(
    persist(
      (set) => ({
        ...initState,
        initWallet: () =>
          set(() => ({
            selectedWalletIndex: 0,
            selectedNetwork: NETWORK.ETHEREUM,
          })),
        selectWallet: (index: number) => set(() => ({ selectedWalletIndex: index }), false, 'selectWallet'),
        selectNetwork: (network: Network) =>
          set(
            () => ({
              selectedNetwork: network,
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
