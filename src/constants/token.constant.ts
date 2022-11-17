import * as TokenIcon from '@@assets/image/token';

export interface ITOKEN {
  [key: string]: keyof typeof TokenIcon;
}

export const TOKEN_LIST = {
  Binance: 'Binance',
  Bitcoin: 'Bitcoin',
  Busd: 'Busd',
  Ethereum: 'Ethereum',
  Mvl: 'Mvl',
  Tezos: 'Tezos',
} as const;

export const WALLET_TOKEN = {
  BNB: 'BNB',
  bMVL: 'bMVL',
  BTCB: 'BTCB',
  Eth: 'Eth',
  Mvl: 'Mvl',
} as const;

export const TRADE_TOKEN = {
  BNB: 'BNB',
  bMVL: 'bMVL',
  BTCB: 'BTCB',
} as const;
