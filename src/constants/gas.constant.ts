import { parseUnits } from 'ethers/lib/utils';

import { NETWORK_FEE_TYPE } from './network.constant';

export const GAS_LEVEL = {
  LOW: 'LOW',
  MID: 'MID',
  HIGH: 'HIGH',
} as const;
export const GAS_LEVEL_SETTING = {
  [GAS_LEVEL.LOW]: {
    weight: '1',
    waitTime: 30_000,
    tip: {
      [NETWORK_FEE_TYPE.EIP1559]: parseUnits('1', 'gwei'),
      [NETWORK_FEE_TYPE.EVM_LEGACY_GAS]: null,
      [NETWORK_FEE_TYPE.TEZOS]: parseUnits('100', 0),
    },
  },
  [GAS_LEVEL.MID]: {
    weight: '1.2',
    waitTime: 30_000,
    tip: {
      [NETWORK_FEE_TYPE.EIP1559]: parseUnits('1.5', 'gwei'),
      [NETWORK_FEE_TYPE.EVM_LEGACY_GAS]: null,
      [NETWORK_FEE_TYPE.TEZOS]: parseUnits('150', 0),
    },
  },
  [GAS_LEVEL.HIGH]: {
    weight: '1.3',
    waitTime: 15_000,
    tip: {
      [NETWORK_FEE_TYPE.EIP1559]: parseUnits('2', 'gwei'),
      [NETWORK_FEE_TYPE.EVM_LEGACY_GAS]: null,
      [NETWORK_FEE_TYPE.TEZOS]: parseUnits('200', 0),
    },
  },
} as const;
