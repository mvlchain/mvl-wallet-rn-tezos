import { useMemo } from 'react';

import BigNumber from 'bignumber.js';

export interface IEIP1559TotalProps {
  advanced: boolean;
  maxFeePerGas: BigNumber | null;
  leveledMaxFeePriorityFeePerGas: BigNumber | null;
  gasLimit: BigNumber | null;
  userInputMaxFeePerGas: BigNumber | null;
  userInputMaxPriorityFeePerGas: BigNumber | null;
  userInputGasLimit: BigNumber | null;
}

const useEIP1559Total = ({
  advanced,
  leveledMaxFeePriorityFeePerGas,
  maxFeePerGas,
  gasLimit,
  userInputMaxFeePerGas,
  userInputMaxPriorityFeePerGas,
  userInputGasLimit,
}: IEIP1559TotalProps) => {
  const getTotal = (maxFeePerGas: BigNumber | null, maxPriorityFeePerGas: BigNumber | null, gasLimit: BigNumber | null) => {
    if (!maxFeePerGas || !maxPriorityFeePerGas || !gasLimit) return null;
    return maxFeePerGas.multipliedBy(gasLimit);
  };

  const total = useMemo(() => {
    switch (advanced) {
      case true:
        return getTotal(userInputMaxFeePerGas, userInputMaxPriorityFeePerGas, userInputGasLimit);
      case false:
        return getTotal(maxFeePerGas, leveledMaxFeePriorityFeePerGas, gasLimit);
    }
  }, [advanced, leveledMaxFeePriorityFeePerGas, maxFeePerGas, gasLimit, userInputMaxFeePerGas, userInputMaxPriorityFeePerGas, userInputGasLimit]);

  return total;
};
export default useEIP1559Total;
