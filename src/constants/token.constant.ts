import * as TokenIcon from '@@assets/image/token';

export interface ITOKEN {
  [key: string]: keyof typeof TokenIcon;
}

export const BASIC_ETH_TOKEN = {
  ETH: 'ETH',
  MVL: 'MVL',
} as const;

export const BASIC_BSC_TOKEN = {
  BNB: 'BNB',
  bMVL: 'bMVL',
  BTCB: 'BTCB',
};

export const WALLET_TOKEN = {
  ...BASIC_ETH_TOKEN,
  ...BASIC_BSC_TOKEN,
} as const;

export const TRADE_TOKEN = {
  ...BASIC_BSC_TOKEN,
} as const;
