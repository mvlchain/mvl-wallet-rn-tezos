import BN from 'bn.js';
import { BigNumber } from 'ethers';
import { formatUnits, parseUnits } from 'ethers/lib/utils';

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

export const GAS_LEVEL_SETTING = {
  [GAS_LEVEL.LOW]: {
    weight: '0.75',
    eip1559Weight: '1.1',
    tezosAdditionalFee: parseUnits('1', 'gwei'),
    maxPriorityFeePerGas: parseUnits('1', 'gwei'),
    waitTime: 30_000,
  },
  [GAS_LEVEL.MID]: {
    weight: '1',
    eip1559Weight: '1.2',
    tezosAdditionalFee: parseUnits('1.5', 'gwei'),
    maxPriorityFeePerGas: parseUnits('1.5', 'gwei'),
    waitTime: 30_000,
  },
  [GAS_LEVEL.HIGH]: {
    weight: '1.5',
    eip1559Weight: '1.3',
    tezosAdditionalFee: parseUnits('2', 'gwei'),
    maxPriorityFeePerGas: parseUnits('2', 'gwei'),
    waitTime: 15_000,
  },
} as const;
