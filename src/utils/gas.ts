import Decimal from 'decimal.js';
import { BigNumber } from 'ethers';

import { NetworkFeeType, NETWORK_FEE_TYPE } from '@@constants/network.constant';
import { GAS_LEVEL_SETTING } from '@@constants/transaction.constant';
import { TGasLevel } from '@@domain/gas/GasService.type';

export const getLeveledBaseFee = (networkFeeType: NetworkFeeType, gasLevel: TGasLevel, baseFee: BigNumber | null) => {
  if (!baseFee) return null;
  switch (networkFeeType) {
    case NETWORK_FEE_TYPE.TEZOS:
      return baseFee;
    default:
      const gasWeight = GAS_LEVEL_SETTING[gasLevel].weight;
      const baseFeeInDecimal = new Decimal(baseFee.toString()).mul(gasWeight);
      return BigNumber.from(BigInt(Math.floor(baseFeeInDecimal.toNumber())));
  }
};
