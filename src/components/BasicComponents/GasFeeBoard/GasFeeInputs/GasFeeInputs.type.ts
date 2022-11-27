import { Dispatch, SetStateAction } from 'react';

import { BigNumber } from 'ethers';

export interface IGasFeeInputsProps {
  gasPrice: BigNumber | null;
  gasLimit: BigNumber | null;
  setGasLimit: Dispatch<SetStateAction<BigNumber>>;
  setGasPrice: Dispatch<SetStateAction<BigNumber | null>>;
}
