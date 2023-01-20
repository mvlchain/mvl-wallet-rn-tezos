import { BigNumber } from 'bignumber.js';
export interface IGasStoreState {
  total: BigNumber | null;
}

export interface IGasStore extends IGasStoreState {
  setTotal: (total: BigNumber | null) => void;
  resetTotal: () => void;
}
