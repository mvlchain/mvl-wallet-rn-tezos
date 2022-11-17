import { valueOf } from '@@types/etc';

export const NETWORK = {
  ETHEREUM: 'ETHEREUM',
  BSC: 'BSC',
} as const;

export type Network = valueOf<typeof NETWORK>;

export const NETWORK_STRINGS: Record<Network | string, string> = {
  [NETWORK.ETHEREUM]: 'Ethereum Mainnet',
  [NETWORK.BSC]: 'Binance Smart Chain',
} as const;
