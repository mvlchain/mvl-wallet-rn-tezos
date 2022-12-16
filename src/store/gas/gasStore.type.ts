import { BigNumber } from 'bignumber.js';

export interface IGasStoreState {
  baseFee: BigNumber | null;
  tip: BigNumber | null;
  gas: BigNumber | null;
  total: BigNumber | null;
}

export interface IGasStore extends IGasStoreState {
  setGas: (newState: Partial<IGasStoreState>) => void;
  resetGas: () => void;
  inString: (target: keyof IGasStoreState, decimal: number) => string | null;
}
