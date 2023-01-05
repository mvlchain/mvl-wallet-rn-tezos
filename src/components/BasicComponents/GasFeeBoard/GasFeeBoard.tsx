import React from 'react';

import { IGasFeeBoardProps } from './GasFeeBoard.type';
import GasFeeBoardLayout from './GasFeeBoardLayout/GasFeeBoardLayout';
import GasFeeInputs from './GasFeeInputs';
import GasLevelRadioButtons from './GasLevelRadioButtons';
import useGasFeeBoard from './useGasFeeBoard';

function GasFeeBoard({ isRevision, onConfirm, tokenDto, onConfirmTitle, hideDivider }: IGasFeeBoardProps) {
  const { advanced, enableTip, enableLimitCustom, baseFeeCheck, tipCheck, gasCheck, toggleGasAdvanced } = useGasFeeBoard(tokenDto);

  return (
    <GasFeeBoardLayout
      isRevision={isRevision}
      onConfirm={onConfirm}
      advanced={advanced}
      toggleGasAdvanced={toggleGasAdvanced}
      onConfirmTitle={onConfirmTitle}
      hideDivider={hideDivider}
    >
      <GasLevelRadioButtons />
      <GasFeeInputs enableTip={enableTip} enableLimitCustom={enableLimitCustom} baseFeeCheck={baseFeeCheck} tipCheck={tipCheck} gasCheck={gasCheck} />
    </GasFeeBoardLayout>
  );
}
export default GasFeeBoard;
