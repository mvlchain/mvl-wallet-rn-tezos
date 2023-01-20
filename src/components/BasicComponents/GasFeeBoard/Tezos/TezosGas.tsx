import React from 'react';

import { ITezosGasComponentProps } from '../GasFeeBoard.type';
import GasInputs from '../common/GasInputs';
import GasFeeBoardLayout from '../common/GasLayout/GasLayout';
import GasLevelRadioButtons from '../common/GasLevelRadioButtons';

import useTezosGas from './useTezosGas';

function TezosGas({ isRevision, onConfirm, onConfirmTitle, hideDivider, to, value, transferParam, isValidInput }: ITezosGasComponentProps) {
  const { advanced, level, setLevel, total, toggleGasAdvanced, wrappedOnConfirm, onConfirmValid, userInputs } = useTezosGas({
    to,
    value,
    transferParam,
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
    >
      <GasLevelRadioButtons level={level} setLevel={setLevel} />
      <GasInputs inputs={userInputs} />
    </GasFeeBoardLayout>
  );
}
export default TezosGas;
