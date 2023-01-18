import { useMemo } from 'react';

import BigNumber from 'bignumber.js';

export interface IEIP1559TotalProps {
  advanced: boolean;
  leveledMaxFeePerGas: BigNumber | null;
  leveledMaxFeePriorityFeePerGas: BigNumber | null;
  gasLimit: BigNumber | null;
  userInputMaxFeePerGas: BigNumber | null;
  userInputMaxPriorityFeePerGas: BigNumber | null;
  userInputGasLimit: BigNumber | null;
}

const useEIP1559Total = ({
  advanced,
  leveledMaxFeePriorityFeePerGas,
  leveledMaxFeePerGas,
  gasLimit,
  userInputMaxFeePerGas,
  userInputMaxPriorityFeePerGas,
  userInputGasLimit,
}: IEIP1559TotalProps) => {
  const total = useMemo(() => {
    switch (advanced) {
      case true:
        return getTotal(userInputMaxFeePerGas, userInputMaxPriorityFeePerGas, userInputGasLimit);
      case false:
        return getTotal(leveledMaxFeePerGas, leveledMaxFeePriorityFeePerGas, gasLimit);
    }
  }, [
    advanced,
    leveledMaxFeePriorityFeePerGas,
    leveledMaxFeePerGas,
    gasLimit,
    userInputMaxFeePerGas,
    userInputMaxPriorityFeePerGas,
    userInputGasLimit,
  ]);

  const getTotal = (maxFeePerGas: BigNumber | null, maxPriorityFeePerGas: BigNumber | null, gasLimit: BigNumber | null) => {
    if (!maxFeePerGas || !maxPriorityFeePerGas || !gasLimit) return null;
    return maxFeePerGas.plus(maxPriorityFeePerGas).multipliedBy(gasLimit);
  };

  return total;
};
export default useEIP1559Total;
