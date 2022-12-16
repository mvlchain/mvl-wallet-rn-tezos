import { useState, useCallback } from 'react';

import { BigNumber } from 'bignumber.js';

import { TokenDto } from '@@generated/generated-scheme-clutch';

import useEstimateGas from './hooks/useEstimateGas';
import useSetAmountMax from './hooks/useSetAmountMax';
import useSetGasState from './hooks/useSetGasState';
import useSetInitial from './hooks/useSetInitial';
import useSetTotal from './hooks/useSetTotal';

const useGasFeeBoard = (tokenDto: TokenDto) => {
  //The setted value
  const [advanced, setAdvanced] = useState(false);
  const [enableTip, setEnableTip] = useState<boolean>(false);
  const [enableLimitCustom, setEnableLimitCustom] = useState<boolean>(true);

  //The reference values from blockchain
  const [blockBaseFee, setBlockBaseFee] = useState<BigNumber | null>(null);
  const [blockGas, setBlockGas] = useState<BigNumber | null>(null);

  useSetTotal({ blockGas });
  useSetGasState({ blockBaseFee, blockGas });
  useEstimateGas({ tokenDto, setBlockBaseFee, setBlockGas });
  useSetInitial({
    setEnableTip,
    setEnableLimitCustom,
    setBlockBaseFee,
    setBlockGas,
  });
  useSetAmountMax(tokenDto);

  const toggleGasAdvanced = useCallback(() => {
    setAdvanced(!advanced);
  }, [advanced]);

  return {
    advanced,
    enableTip,
    enableLimitCustom,
    toggleGasAdvanced,
  };
};

export default useGasFeeBoard;
