import { NETWORK, Network } from '@@constants/network.constant';

export const NETWORK_INFO: Record<Network, { rpcUrl: string; chainId: number } | { rpcUrl: string }> = {
  [NETWORK.BSC_TESTNET]: {
    rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545',
    chainId: 97,
  },
  [NETWORK.ETHEREUM_TESTNET]: {
    rpcUrl: 'https://goerli.infura.io/v3/***REMOVED***',
    chainId: 5,
  },
  [NETWORK.BSC]: {
    rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545',
    chainId: 97,
  },
  [NETWORK.ETHEREUM]: {
    rpcUrl: 'https://goerli.infura.io/v3/***REMOVED***',
    chainId: 5,
  },
  [NETWORK.TEZOS]: {
    rpcUrl: 'https://ghostnet.tezos.marigold.dev/',
  },
  [NETWORK.TEZOS_TESTNET]: {
    rpcUrl: 'https://ghostnet.tezos.marigold.dev/',
  },
};
