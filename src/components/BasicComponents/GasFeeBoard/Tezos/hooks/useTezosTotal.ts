import { Dispatch, SetStateAction, useMemo } from 'react';

import BigNumber from 'bignumber.js';

export interface ITezosTotalProps {
  advanced: boolean;
  baseFee: BigNumber | null;
  leveledTip: BigNumber | null;
  storageLimit: BigNumber | null;
  storageFee: BigNumber | null;
  userInputBaseFee: BigNumber | null;
  userInputTip: BigNumber | null;
}

const useTezosTotal = ({ advanced, baseFee, leveledTip, storageLimit, storageFee, userInputBaseFee, userInputTip }: ITezosTotalProps) => {
  const getTotal = (baseFee: BigNumber | null, tip: BigNumber | null) => {
    if (!baseFee || !tip) return null;
    return baseFee.plus(tip);
  };
  const total = useMemo(() => {
    switch (advanced) {
      case true:
        return getTotal(userInputBaseFee, userInputTip);
      case false:
        return getTotal(baseFee, leveledTip);
    }
  }, [advanced, baseFee, leveledTip, userInputBaseFee, userInputTip]);

  return total;
};
export default useTezosTotal;
