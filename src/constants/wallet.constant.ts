import { NETWORK } from '@@constants/network.constant';

export const ETH_NAME = 'ethereum';
export const BINANCE_NAME = 'binancecoin';
export const MVL_NAME = 'mass-vehicle-ledger';
export const B_MVL_NAME = 'mass-vehicle-ledger';
export const BTCB_NAME = 'binance-bitcoin';

export const PRICE_NAME = {
  ETH: ETH_NAME,
  MVL: MVL_NAME,
  BNB: BINANCE_NAME,
  bMVL: B_MVL_NAME,
  BTCB: BTCB_NAME,
} as const;

export const ETH_TYPE = [ETH_NAME, 'eth', 'Ethereum'];
export const BINANCE_TYPE = [BINANCE_NAME, 'BNB', 'Binance'];
export const MVL_TYPE = [MVL_NAME, 'mvl', 'MVL'];
export const B_MVL_TYPE = [B_MVL_NAME, 'bmvl', 'bMVL'];
export const BTCB_TYPE = [BTCB_NAME, 'btcb', 'Binance Bitcoin'];

export const PRICE_TYPE = {
  [NETWORK.ETH]: {
    ETHEREUM: ETH_TYPE,
    MVL: MVL_TYPE,
  },
  [NETWORK.BSC]: {
    BINANCE: BINANCE_TYPE,
    B_MVL: B_MVL_TYPE,
    BTCB: BTCB_TYPE,
  },
  [NETWORK.GOERLI]: {
    ETHEREUM: ETH_TYPE,
    MVL: MVL_TYPE,
  },
  [NETWORK.BSC_TESTNET]: {
    BINANCE: BINANCE_TYPE,
    B_MVL: B_MVL_TYPE,
    BTCB: BTCB_TYPE,
  },
} as const;
