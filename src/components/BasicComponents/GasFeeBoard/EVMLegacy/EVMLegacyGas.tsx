import React from 'react';

import { IEVMGasComponentProps } from '../GasFeeBoard.type';
import GasInputs from '../common/GasInputs';
import GasFeeBoardLayout from '../common/GasLayout/GasLayout';
import GasLevelRadioButtons from '../common/GasLevelRadioButtons';

import useEVMGas from './useEVMGas';

function EVMLegacyGas({ isRevision, onConfirm, onConfirmTitle, hideDivider, to, value, data, isValidInput }: IEVMGasComponentProps) {
  const { advanced, level, setLevel, total, toggleGasAdvanced, wrappedOnConfirm, onConfirmValid, userInputs } = useEVMGas({
    to,
    value,
    data,
    isValidInput,
    onConfirm,
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
export default EVMLegacyGas;
