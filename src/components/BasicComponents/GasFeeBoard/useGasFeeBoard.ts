import { useState, useCallback } from 'react';

import { BigNumber } from 'bignumber.js';

// import { TokenDto } from '@@generated/generated-scheme-clutch';
import { TokenDto } from '@@store/token/tokenPersistStore.type';

import useBaseFeeValidation from './hooks/useBaseFeeValidation';
import useEstimateGas from './hooks/useEstimateGas';
import useGasValidation from './hooks/useGasValidation';
import useSetGasState from './hooks/useSetGasState';
import useSetInitial from './hooks/useSetInitial';
import useSetTotal from './hooks/useSetTotal';
import useTipValidation from './hooks/useTipValidation';

const useGasFeeBoard = (tokenDto: TokenDto) => {
  //The setted value
  const [advanced, setAdvanced] = useState(false);
  const [enableTip, setEnableTip] = useState<boolean>(false);
  const [enableLimitCustom, setEnableLimitCustom] = useState<boolean>(true);

  //The reference values from blockchain
  const [blockBaseFee, setBlockBaseFee] = useState<BigNumber | null>(null);
  const [blockGas, setBlockGas] = useState<BigNumber | null>(null);

  useSetTotal({ blockGas });
  useSetGasState({ blockBaseFee, blockGas, advanced });
  useEstimateGas({ tokenDto, advanced, setBlockBaseFee, setBlockGas });
  useSetInitial({
    setEnableTip,
    setEnableLimitCustom,
    setBlockBaseFee,
    setBlockGas,
  });

  const { baseFeeCheck } = useBaseFeeValidation(tokenDto, blockBaseFee);
  const { tipCheck } = useTipValidation(tokenDto);
  const { gasCheck } = useGasValidation();

  const toggleGasAdvanced = useCallback(() => {
    setAdvanced(!advanced);
  }, [advanced]);

  return {
    advanced,
    enableTip,
    enableLimitCustom,
    baseFeeCheck,
    tipCheck,
    gasCheck,
    toggleGasAdvanced,
  };
};

export default useGasFeeBoard;
