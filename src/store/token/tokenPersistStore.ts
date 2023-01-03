import AsyncStorage from '@react-native-async-storage/async-storage';
import zustandFlipper from 'react-native-flipper-zustand';
import create from 'zustand';
import { persist } from 'zustand/middleware';

import { Network } from '@@constants/network.constant';

import {
  ETHEREUM_TOKEN_LIST,
  BSC_TOKEN_LIST,
  TEZOS_TOKEN_LIST,
  GOERLI_TOKEN_LIST,
  BSC_TESTNET_TOKEN_LIST,
  TEZOS_GHOSTNET_TOKEN_LIST,
} from './tokenPersistStore.constant';
import { ITokenPersist, ITokenPersistState, TokenDTO } from './tokenPersistStore.type';

const initState: ITokenPersistState = {
  tokenList: {
    ETHEREUM: ETHEREUM_TOKEN_LIST,
    BSC: BSC_TOKEN_LIST,
    TEZOS: TEZOS_TOKEN_LIST,
    GOERLI: GOERLI_TOKEN_LIST,
    BSC_TESTNET: BSC_TESTNET_TOKEN_LIST,
    TEZOS_GHOSTNET: TEZOS_GHOSTNET_TOKEN_LIST,
  },
};

const tokenPersistStore = create(
  zustandFlipper(
    persist<ITokenPersist>(
      (set) => ({
        ...initState,
        setToken: (network: Network, tokenDto: TokenDTO) =>
          set((state) => {
            const uniqueTokenList = new Set([...state.tokenList[network]]);
            uniqueTokenList.add(tokenDto);
            return {
              tokenList: { ...state.tokenList, [network]: [...uniqueTokenList] },
            };
          }),
      }),
      {
        name: 'tokenPersist',
        getStorage: () => AsyncStorage,
      }
    ),
    'tokenPersistStore'
  )
);

export default tokenPersistStore;
