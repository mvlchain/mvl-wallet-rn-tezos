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

// eth와 bsc둘다 helper method이름이 getEthBalance임
export const ERC20_MULTICALL_METHOD = {
  COIN: 'getEthBalance(address)(uint256)',
  TOKEN: 'balanceOf(address)(uint256)',
};
