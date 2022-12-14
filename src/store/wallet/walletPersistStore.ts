import AsyncStorage from '@react-native-async-storage/async-storage';
import zustandFlipper from 'react-native-flipper-zustand';
import create from 'zustand';
import { persist } from 'zustand/middleware';

import { Network, NETWORK } from '@@constants/network.constant';
import { TokenDto } from '@@generated/generated-scheme-clutch';

import * as Type from './walletPersistStore.type';

const initState: Type.IWalletPersistState = {
  selectedWalletIndex: {
    [NETWORK.ETH]: 0,
    [NETWORK.BSC]: 0,
    [NETWORK.GOERLI]: 0,
    [NETWORK.BSC_TESTNET]: 0,
    [NETWORK.TEZOS]: 0,
    [NETWORK.TEZOS_GHOSTNET]: 0,
  },
  selectedNetwork: NETWORK.ETH,
  walletList: {
    ETHEREUM: [{ index: -1, name: 'default Wallet' }],
    BSC: [{ index: -1, name: 'default Wallet' }],
    GOERLI: [{ index: -1, name: 'default Wallet' }],
    BSC_TESTNET: [{ index: -1, name: 'default Wallet' }],
    TEZOS: [{ index: -1, name: 'default Wallet' }],
    TEZOS_GHOSTNET: [{ index: -1, name: 'default Wallet' }],
  },
  receiveHistory: {
    ETHEREUM: [],
    BSC: [],
    GOERLI: [],
    BSC_TESTNET: [],
    TEZOS: [],
    TEZOS_GHOSTNET: [],
  },
};

const walletPersistStore = create(
  zustandFlipper(
    persist<Type.IWalletPersist>(
      (set) => ({
        ...initState,
        initWallet: () =>
          set(() => ({
            ...initState,
          })),
        selectWallet: (index: number) =>
          set((state) => ({
            selectedWalletIndex: {
              ...state.selectedWalletIndex,
              [state.selectedNetwork]: index,
            },
          })),
        selectNetwork: (network: Network) =>
          set(() => ({
            selectedNetwork: network,
          })),
        setWallets: (network: Network, wallets: Type.IPersistWallet[]) =>
          set((state) => ({ walletList: { ...state.walletList, [network]: wallets } })),
        editWalletName: (wallet: Type.IPersistWallet, network: Network) =>
          set((state) => ({
            walletList: {
              ...state.walletList,
              [network]: state.walletList[network].map((origin) => {
                if (origin.index === wallet.index) {
                  return { ...origin, name: wallet.name };
                }
                return origin;
              }),
            },
          })),
        createWallet: (network: Network) =>
          set((state) => ({
            walletList: {
              ...state.walletList,
              [network]: [
                ...state.walletList[network],
                { index: state.walletList[network].length, name: `Wallet ${state.walletList[network].length + 1}` },
              ],
            },
          })),
        addReceiveHistory: (network: Network, token: TokenDto, amount: string, cacheQR: string) =>
          set((state) => {
            let _receiveHistory = state.receiveHistory[network];
            _receiveHistory = _receiveHistory.filter((history) => history.token.symbol !== token.symbol);
            if (_receiveHistory.length > 2) {
              _receiveHistory.pop();
            }
            _receiveHistory.unshift({
              token,
              amount,
              cacheQR,
            });
            return {
              receiveHistory: {
                ...state.receiveHistory,
                [network]: [..._receiveHistory],
              },
            };
          }),
      }),
      {
        name: 'walletPersist',
        getStorage: () => AsyncStorage,
      }
    ),
    'walletPersistStore'
  )
);

export default walletPersistStore;
