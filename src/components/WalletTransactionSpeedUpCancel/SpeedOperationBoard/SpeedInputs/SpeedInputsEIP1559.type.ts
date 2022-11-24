import { Dispatch, SetStateAction } from 'react';

import { BigNumber } from 'ethers';

export interface ISpeedInputsEIP1559Props {
  maxFeePerGas: BigNumber | null;
  maxPriorityFeePerGas: BigNumber | null;
  gasLimit: BigNumber;
  setMaxFeePerGas: Dispatch<SetStateAction<BigNumber | null>>;
  setMaxPriorityFeePerGas: Dispatch<SetStateAction<BigNumber | null>>;
  setGasLimit: Dispatch<SetStateAction<BigNumber>>;
}
