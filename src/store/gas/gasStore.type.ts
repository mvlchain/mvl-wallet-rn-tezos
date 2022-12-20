import { BigNumber } from 'bignumber.js';

import { TGasLevel } from '@@domain/gas/GasService.type';

export interface IGasStoreState {
  baseFee: BigNumber | null;
  tip: BigNumber | null;
  gas: BigNumber | null;
  total: BigNumber | null;
  level: TGasLevel;
  baseFeeValid: boolean;
  tipValid: boolean;
  gasValid: boolean;
}

export interface IGasStore extends IGasStoreState {
  setState: (newState: Partial<IGasStoreState>) => void;
  resetState: () => void;
}
