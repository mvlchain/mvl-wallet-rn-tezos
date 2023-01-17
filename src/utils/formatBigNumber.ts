import { BigNumber } from 'bignumber.js';
import { BigNumber as BigNumberEther } from 'ethers';

export const formatBigNumber = (amount: BigNumber, decimals: number) => {
  const bigNum = new BigNumber(amount);
  if (bigNum.isNaN()) {
    return amount;
  }
  return bigNum.multipliedBy(Math.pow(10, 0)).dividedBy(Math.pow(10, decimals));
};

export const BnToEtherBn = (value: BigNumber) => {
  return BigNumberEther.from(value.toFixed(0));
};

export const etherBNtoBN = (value: BigNumberEther | null) => {
  return value ? new BigNumber(value.toString()) : null;
};
