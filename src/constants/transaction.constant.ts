import { BigNumber } from 'ethers';
import { parseUnits } from 'ethers/lib/utils';

import { NETWORK_FEE_TYPE } from './network.constant';

export const TRANSACTION_HISTORY_FILTER_CRITERIA = {
  ALL: 'All',
  SENT_ONLY: 'Sent Only',
  RECEIVED_ONLY: 'Received Only',
} as const;

export const GAS_LEVEL = {
  LOW: 'LOW',
  MID: 'MID',
  HIGH: 'HIGH',
} as const;

//TODO: 적당한 weight는 무엇일까. 메타에서 가져옴
export const GAS_LEVEL_SETTING = {
  [GAS_LEVEL.LOW]: {
    weight: '1',
    tip: {
      [NETWORK_FEE_TYPE.EIP1559]: parseUnits('1', 'gwei'),
      [NETWORK_FEE_TYPE.EVM_LEGACY_GAS]: null,
      [NETWORK_FEE_TYPE.TEZOS]: BigNumber.from('1'),
    },
    waitTime: 30_000,
  },
  [GAS_LEVEL.MID]: {
    weight: '1.2',
    tip: {
      [NETWORK_FEE_TYPE.EIP1559]: parseUnits('1.5', 'gwei'),
      [NETWORK_FEE_TYPE.EVM_LEGACY_GAS]: null,
      [NETWORK_FEE_TYPE.TEZOS]: BigNumber.from('1.5'),
    },
    waitTime: 30_000,
  },
  [GAS_LEVEL.HIGH]: {
    weight: '1.3',
    tip: {
      [NETWORK_FEE_TYPE.EIP1559]: parseUnits('2', 'gwei'),
      [NETWORK_FEE_TYPE.EVM_LEGACY_GAS]: null,
      [NETWORK_FEE_TYPE.TEZOS]: BigNumber.from('2'),
    },
    waitTime: 15_000,
  },
} as const;
