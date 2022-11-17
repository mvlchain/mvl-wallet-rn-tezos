import AsyncStorage from '@react-native-async-storage/async-storage';
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { Network, NETWORK } from '@@constants/network.constant';

import * as Type from './walletPersistStore.type';

const initState: Type.IWalletPersistState = {
  selectedWalletIndex: 0,
  selectedNetwork: NETWORK.ETH,
  walletList: { ETHEREUM: [{ index: -1, name: 'default Wallet' }], BSC: [{ index: -1, name: 'default Wallet' }] },
};

const walletPersistStore = create<Type.IWalletPersist>()(
  devtools(
    persist(
      (set) => ({
        ...initState,
        initWallet: () =>
          set(() => ({
            ...initState,
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
        setWallets: (wallets: Type.IPersistWallet[]) => set(() => ({ walletList: { ETHEREUM: wallets, BSC: wallets } }), false, 'setWallet'),
        editWalletName: (wallet: Type.IPersistWallet, network: Network) =>
          set(
            (state) => ({
              walletList: {
                ...state.walletList,
                [network]: state.walletList[network].map((origin) => {
                  if (origin.index === wallet.index) {
                    origin.name = wallet.name;
                  }
                  return origin;
                }),
              },
            }),
            false,
            'editWalletName'
          ),
        createWallet: () =>
          set(
            (state) => ({
              walletList: {
                ETHEREUM: [
                  ...state.walletList.ETHEREUM,
                  { index: state.walletList.ETHEREUM.length, name: `Wallet ${state.walletList.ETHEREUM.length + 1}` },
                ],
                BSC: [...state.walletList.BSC, { index: state.walletList.BSC.length, name: `Wallet ${state.walletList.BSC.length + 1}` }],
              },
            }),
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
