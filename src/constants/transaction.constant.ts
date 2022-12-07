import { parseUnits } from 'ethers/lib/utils';

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
    tip: parseUnits('1', 'gwei'),
    waitTime: 30_000,
  },
  [GAS_LEVEL.MID]: {
    weight: '1.2',
    tip: parseUnits('1.5', 'gwei'),
    waitTime: 30_000,
  },
  [GAS_LEVEL.HIGH]: {
    weight: '1.3',
    tip: parseUnits('2', 'gwei'),
    waitTime: 15_000,
  },
} as const;
