import BigNumber from 'bignumber.js';

import { NETWORK_FEE_TYPE } from './network.constant';

export const GAS_LEVEL = {
  LOW: 'LOW',
  MID: 'MID',
  HIGH: 'HIGH',
} as const;

export const GAS_UNIT = {
  GWEI: 'GWEI',
  MUTEZ: 'MUTEZ',
} as const;

export const GAS_UNIT_DECIMAL = {
  [GAS_UNIT.GWEI]: 9,
  [GAS_UNIT.MUTEZ]: 0,
} as const;

export type TGasUnit = keyof typeof GAS_UNIT;
export type TGasUnitDecimal = typeof GAS_UNIT_DECIMAL[keyof typeof GAS_UNIT];

export const GAS_LEVEL_SETTING = {
  [GAS_LEVEL.LOW]: {
    weight: '1',
    waitTime: 30_000,
    tip: {
      [NETWORK_FEE_TYPE.EIP1559]: new BigNumber('1').shiftedBy(9),
      [NETWORK_FEE_TYPE.EVM_LEGACY_GAS]: null,
      [NETWORK_FEE_TYPE.TEZOS]: new BigNumber('100'),
    },
  },
  [GAS_LEVEL.MID]: {
    weight: '1.2',
    waitTime: 30_000,
    tip: {
      [NETWORK_FEE_TYPE.EIP1559]: new BigNumber('1.5').shiftedBy(9),
      [NETWORK_FEE_TYPE.EVM_LEGACY_GAS]: null,
      [NETWORK_FEE_TYPE.TEZOS]: new BigNumber('150'),
    },
  },
  [GAS_LEVEL.HIGH]: {
    weight: '1.3',
    waitTime: 15_000,
    tip: {
      [NETWORK_FEE_TYPE.EIP1559]: new BigNumber('2').shiftedBy(9),
      [NETWORK_FEE_TYPE.EVM_LEGACY_GAS]: null,
      [NETWORK_FEE_TYPE.TEZOS]: new BigNumber('200'),
    },
  },
} as const;
