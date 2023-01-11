import React from 'react';

import { IGasFeeBoardProps } from './GasFeeBoard.type';
import GasFeeBoardLayout from './GasFeeBoardLayout/GasFeeBoardLayout';
import GasFeeInputs from './GasFeeInputs';
import GasLevelRadioButtons from './GasLevelRadioButtons';
import useGasFeeBoard from './useGasFeeBoard';

function GasFeeBoard({ isRevision, onConfirm, tokenDto, onConfirmTitle, hideDivider, to, value, data, isValidInput }: IGasFeeBoardProps) {
  const { advanced, enableTip, enableLimitCustom, baseFeeCheck, tipCheck, gasCheck, toggleGasAdvanced, wrappedOnConfirm } = useGasFeeBoard({
    to,
    value,
    data,
    isValidInput,
    tokenDto,
    onConfirm,
  });

  return (
    <GasFeeBoardLayout
      onConfirm={wrappedOnConfirm}
      onConfirmTitle={onConfirmTitle}
      onConfirmValid={isValidInput}
      advanced={advanced}
      toggleGasAdvanced={toggleGasAdvanced}
      hideDivider={hideDivider}
      isRevision={isRevision}
    >
      <GasLevelRadioButtons />
      <GasFeeInputs enableTip={enableTip} enableLimitCustom={enableLimitCustom} baseFeeCheck={baseFeeCheck} tipCheck={tipCheck} gasCheck={gasCheck} />
    </GasFeeBoardLayout>
  );
}
export default GasFeeBoard;
