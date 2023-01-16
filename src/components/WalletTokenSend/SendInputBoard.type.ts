import { Dispatch, SetStateAction } from 'react';

import BigNumber from 'bignumber.js';

export interface ISendInputBoardProps {
  amount: BigNumber | null;
  setAmount: (amount: BigNumber | null) => void;
  address: string | null;
  setAddress: (address: string) => void;
}
