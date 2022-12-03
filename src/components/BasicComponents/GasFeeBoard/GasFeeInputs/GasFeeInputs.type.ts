import { Dispatch, SetStateAction } from 'react';

import { BigNumber } from 'ethers';

export interface IGasFeeInputsProps {
  enableTip: boolean;
  enableLimitCustom: boolean;
  customBaseFee: BigNumber | null;
  customTip: BigNumber | null;
  customGasLimit: BigNumber | null;
  setCustomBaseFee: Dispatch<SetStateAction<BigNumber | null>>;
  setCustomTip: Dispatch<SetStateAction<BigNumber | null>>;
  setCustomGasLimit: Dispatch<SetStateAction<BigNumber | null>>;
}
