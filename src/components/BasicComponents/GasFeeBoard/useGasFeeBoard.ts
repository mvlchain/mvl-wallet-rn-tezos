import { useState, useCallback } from 'react';

import { BigNumber } from 'bignumber.js';
import { BytesLike } from 'ethers';

import { IGasFeeInfo } from '@@domain/gas/GasService.type';
import gasStore from '@@store/gas/gasStore';
import { TokenDto } from '@@store/token/tokenPersistStore.type';

import { IUseGasFeeBoard } from './GasFeeBoard.type';
import useBaseFeeValidation from './hooks/useBaseFeeValidation';
import useEstimateGas from './hooks/useEstimateGas';
import useGasValidation from './hooks/useGasValidation';
import useSetGasState from './hooks/useSetGasState';
import useSetInitial from './hooks/useSetInitial';
import useSetTotal from './hooks/useSetTotal';
import useTipValidation from './hooks/useTipValidation';

const useGasFeeBoard = ({ to, value, data, isValidInput, tokenDto, onConfirm }: IUseGasFeeBoard) => {
  //The setted value
  const [advanced, setAdvanced] = useState(false);
  const [enableTip, setEnableTip] = useState<boolean>(false);
  const [enableLimitCustom, setEnableLimitCustom] = useState<boolean>(true);

  //The reference values from blockchain
  const [blockBaseFee, setBlockBaseFee] = useState<BigNumber | null>(null);
  const [blockGas, setBlockGas] = useState<BigNumber | null>(null);
  const { baseFee, gas, total, tip, isDataRequired } = gasStore();

  useSetTotal({ to, value, blockGas });
  useSetGasState({ blockBaseFee, blockGas, advanced });
  useEstimateGas({ to, value, data, isValidInput, tokenDto, setBlockBaseFee, setBlockGas });
  useSetInitial({
    setEnableTip,
    setEnableLimitCustom,
    setBlockBaseFee,
    setBlockGas,
    isValidInput,
  });

  const { baseFeeCheck } = useBaseFeeValidation(tokenDto, blockBaseFee);
  const { tipCheck } = useTipValidation(tokenDto);
  const { gasCheck } = useGasValidation();
  const wrappedOnConfirm = () => {
    //TODO: nonnullassertion 정리좀
    if (!to || !value || !baseFee || !gas || !total || (enableTip && !tip)) return;
    const isCoin = !tokenDto.contractAddress;
    if ((isDataRequired || !isCoin) && !data) return;
    const confirmParam = {
      to: isDataRequired || isCoin ? to : tokenDto.contractAddress!,
      value: isCoin ? value : undefined,
      data: isDataRequired || !isCoin ? data! : undefined,
      gasFeeInfo: { baseFee, gas, total, tip: enableTip ? tip! : undefined },
    };

    onConfirm(confirmParam);
  };

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
    wrappedOnConfirm,
  };
};

export default useGasFeeBoard;
