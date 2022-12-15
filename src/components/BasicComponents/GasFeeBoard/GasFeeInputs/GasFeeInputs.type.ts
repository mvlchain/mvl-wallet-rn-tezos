import { Dispatch, SetStateAction } from 'react';

import { BigNumber } from 'ethers';

export interface IGasFeeInputsProps {
  enableTip: boolean;
  enableLimitCustom: boolean;
  customBaseFee: BigNumber | null;
  customTip: BigNumber | null;
  customGas: BigNumber | null;
  setCustomBaseFee: Dispatch<SetStateAction<BigNumber | null>>;
  setCustomTip: Dispatch<SetStateAction<BigNumber | null>>;
  setCustomGas: Dispatch<SetStateAction<BigNumber | null>>;
}
