import { Dispatch, SetStateAction } from 'react';

import { BigNumber } from 'ethers';

export interface ISpeedInputsProps {
  gasPrice: BigNumber | null;
  gasLimit: BigNumber | null;
  setGasLimit: Dispatch<SetStateAction<BigNumber>>;
  setGasPrice: Dispatch<SetStateAction<BigNumber | null>>;
}
