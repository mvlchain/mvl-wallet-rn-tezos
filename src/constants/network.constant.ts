import { valueOf } from '@@utils/types';

export const NETWORK = {
  ETH: 'ETHEREUM',
  BSC: 'BSC',
} as const;

export type Network = valueOf<typeof NETWORK>;

export const NETWORK_STRINGS: Record<string, Record<Network | string, string>> = {
  mainnet: {
    [NETWORK.ETH]: 'Ethereum Mainnet',
    [NETWORK.BSC]: 'Binance Smart Chain',
  },
  testnet: {
    [NETWORK.ETH]: 'Ethereum Testnet',
    [NETWORK.BSC]: 'Binance Smart Chain Testnet',
  },
} as const;
