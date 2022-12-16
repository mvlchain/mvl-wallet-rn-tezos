import React from 'react';

import { IGasFeeBoardProps } from './GasFeeBoard.type';
import GasFeeBoardLayout from './GasFeeBoardLayout/GasFeeBoardLayout';
import GasFeeInputs from './GasFeeInputs';
import GasLevelRadioButtons from './GasLevelRadioButtons';
import useGasFeeBoard from './useGasFeeBoard';

function GasFeeBoard({ isRevision, onConfirm, tokenDto, isValid }: IGasFeeBoardProps) {
  const { advanced, enableTip, enableLimitCustom, toggleGasAdvanced } = useGasFeeBoard(tokenDto);
  return (
    <GasFeeBoardLayout isRevision={isRevision} onConfirm={onConfirm} advanced={advanced} toggleGasAdvanced={toggleGasAdvanced} isValid={isValid}>
      <GasLevelRadioButtons />
      <GasFeeInputs enableTip={enableTip} enableLimitCustom={enableLimitCustom} />
    </GasFeeBoardLayout>
  );
}
export default GasFeeBoard;
