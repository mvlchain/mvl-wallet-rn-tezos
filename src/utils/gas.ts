import { BigNumber } from 'bignumber.js';
import Decimal from 'decimal.js';
import { BigNumber as BigNumberEther } from 'ethers';

import { GAS_LEVEL_SETTING } from '@@constants/gas.constant';
import { NetworkFeeType, NETWORK_FEE_TYPE } from '@@constants/network.constant';
import { TGasLevel } from '@@domain/gas/GasService.type';

export const getLeveledBaseFee = (networkFeeType: NetworkFeeType, gasLevel: TGasLevel, baseFee: BigNumber | null) => {
  if (!baseFee) return null;
  switch (networkFeeType) {
    case NETWORK_FEE_TYPE.TEZOS:
      return baseFee;
    default:
      const gasWeight = GAS_LEVEL_SETTING[gasLevel].weight;
      return baseFee.multipliedBy(gasWeight);
  }
};

export const getEstimateTime = (gasLevel: TGasLevel) => {
  return GAS_LEVEL_SETTING[gasLevel].waitTime;
};

export const etherBNtoBN = (value: BigNumberEther | null) => {
  return value ? new BigNumber(value.toString()) : null;
};
