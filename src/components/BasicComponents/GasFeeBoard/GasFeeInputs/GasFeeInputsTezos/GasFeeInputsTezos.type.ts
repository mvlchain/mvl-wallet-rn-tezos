import { Dispatch, SetStateAction } from 'react';

import { BigNumber } from 'ethers';

export interface IGasFeeInputsTezosProps {
  baseFee: BigNumber | null;
  additionalFee: BigNumber;
  setAdditionalFee: Dispatch<SetStateAction<BigNumber>>;
}
