import { useMemo } from 'react';

import BigNumber from 'bignumber.js';

export interface IEVMTotalProps {
  advanced: boolean;
  leveledGasPrice: BigNumber | null;
  gasLimit: BigNumber | null;
  userInputGasPrice: BigNumber | null;
  userInputGasLimit: BigNumber | null;
}

const useEVMTotal = ({ advanced, leveledGasPrice, gasLimit, userInputGasPrice, userInputGasLimit }: IEVMTotalProps) => {
  const getTotal = (gasPrice: BigNumber | null, gasLimit: BigNumber | null) => {
    if (!gasPrice || !gasLimit) return null;
    return gasPrice.multipliedBy(gasLimit);
  };

  const total = useMemo(() => {
    switch (advanced) {
      case true:
        return getTotal(userInputGasPrice, userInputGasLimit);
      case false:
        return getTotal(leveledGasPrice, gasLimit);
    }
  }, [advanced, leveledGasPrice, gasLimit, userInputGasPrice, userInputGasLimit]);

  return total;
};
export default useEVMTotal;
