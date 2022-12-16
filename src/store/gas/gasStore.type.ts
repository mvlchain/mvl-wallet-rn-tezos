import { BigNumber } from 'bignumber.js';

import { TGasLevel } from '@@domain/gas/GasService.type';

export interface IGasStoreState {
  baseFee: BigNumber | null;
  tip: BigNumber | null;
  gas: BigNumber | null;
  total: BigNumber | null;
  level: TGasLevel;
}

export interface IGasStore extends IGasStoreState {
  setState: (newState: Partial<IGasStoreState>) => void;
  resetState: () => void;
  inString: (target: keyof Omit<IGasStoreState, 'level'>, decimal: number) => string | null;
}
