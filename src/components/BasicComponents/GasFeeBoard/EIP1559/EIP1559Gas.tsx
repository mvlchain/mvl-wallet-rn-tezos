import React from 'react';

import { IEVMGasComponentProps } from '../GasFeeBoard.type';
import GasInputs from '../common/GasInputs';
import GasFeeBoardLayout from '../common/GasLayout/GasLayout';
import GasLevelRadioButtons from '../common/GasLevelRadioButtons';

import useEIP1559Gas from './useEIP1559Gas';

function EIP1559Gas({
  isRevision,
  onConfirm,
  onConfirmTitle,
  hideDivider,
  to,
  value,
  data,
  isValidInput,
  initialLevel,
  isHoldingGasEstimatePolling,
}: IEVMGasComponentProps) {
  const { advanced, level, setLevel, total, toggleGasAdvanced, wrappedOnConfirm, onConfirmValid, userInputs } = useEIP1559Gas({
    to,
    value,
    data,
    isValidInput,
    onConfirm,
    initialLevel,
    isHoldingGasEstimatePolling,
  });

  return (
    <GasFeeBoardLayout
      onConfirm={wrappedOnConfirm}
      onConfirmTitle={onConfirmTitle}
      onConfirmValid={onConfirmValid}
      advanced={advanced}
      toggleGasAdvanced={toggleGasAdvanced}
      hideDivider={hideDivider}
      isRevision={isRevision}
      total={total}
      // estimatedTime={estimatedTime}
    >
      <GasLevelRadioButtons level={level} setLevel={setLevel} />
      <GasInputs inputs={userInputs} />
    </GasFeeBoardLayout>
  );
}
export default EIP1559Gas;
