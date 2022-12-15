import { BigNumber } from 'bignumber.js';

export const formatBigNumber = (amount: BigNumber, decimals: number) => {
  const bigNum = new BigNumber(amount);
  if (bigNum.isNaN()) {
    return amount;
  }
  return bigNum.multipliedBy(Math.pow(10, 0)).dividedBy(Math.pow(10, decimals));
};
