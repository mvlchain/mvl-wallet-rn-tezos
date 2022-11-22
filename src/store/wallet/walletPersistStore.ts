import AsyncStorage from '@react-native-async-storage/async-storage';
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { Network, NETWORK } from '@@constants/network.constant';

import * as Type from './walletPersistStore.type';

const initState: Type.IWalletPersistState = {
  selectedWalletIndex: 0,
  selectedNetwork: NETWORK.ETHEREUM,
  walletList: [{ index: -1, name: 'default Wallet' }],
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
            walletList: [{ index: -1, name: 'default Wallet' }],
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
        setWallets: (wallets: Type.IPersistWallet[]) => set(() => ({ walletList: wallets }), false, 'setWallet'),
        editWalletName: (wallet: Type.IPersistWallet) =>
          set(
            (state) => ({
              walletList: state.walletList.map((origin) => {
                if (origin.index === wallet.index) {
                  origin.name = wallet.name;
                }
                return origin;
              }),
            }),
            false,
            'editWalletName'
          ),
        createWallet: () =>
          set(
            (state) => ({ walletList: [...state.walletList, { index: state.walletList.length, name: `Wallet ${state.walletList.length + 1}` }] }),
            false,
            'createWallet'
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
