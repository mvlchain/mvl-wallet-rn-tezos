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

export const alphaNumericDecimalRegex = (decimal: number) => {
  // tokenDTO에 있는 decimals를 기준으로 입력 가능하게 자름
  return new RegExp(`^(\\d{0,60})([.]\\d{0,${decimal}})*?$`);
};

export const inputNumberFormatter = (value: string | undefined, tokenDecimal: number) => {
  if (!value) return null;
  // .으로 시작할 때 제외
  if (value === '.') return null;
  // 숫자, 소수점만 입력 가능, 소수점 token decimals까지만 입력 가능
  const regExp = alphaNumericDecimalRegex(tokenDecimal);
  if (!regExp.test(value)) return null;

  // 0이 여러개로 시작할 때 제외
  if (value.length > 1 && value.startsWith('0') && value[1] !== '.') {
    value = value.slice(1);
  }
  // 소수점 2개 제외
  if (value.indexOf('.') !== value.lastIndexOf('.')) {
    return null;
  }

  return value;
};
