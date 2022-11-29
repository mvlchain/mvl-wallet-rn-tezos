import React from 'react';

import GasFeeInputsEIP1559 from '../../GasFeeInputs/GasFeeInputsEip1559';
import GasLevelRadioButtons from '../../GasLevelRadioButtons';
import GasFeeBoardLayout from '../GasFeeBoardLayout';

import { IGasFeeBoardEip1559Props } from './GasFeeBoardEip1559.type';
import useGasFeeEip1559 from './useGasFeeEip1559';

function GasFeeBoardEip1559({ isRevision, onConfirm }: IGasFeeBoardEip1559Props) {
  const {
    gasLimit,
    transactionFee,
    advanced,
    gasLevel,
    maxFeePerGas,
    maxPriorityFeePerGas,
    setGasLevel,
    handleAdvanced,
    setGasLimit,
    setMaxFeePerGas,
    setMaxPriorityFeePerGas,
  } = useGasFeeEip1559();
  return (
    <GasFeeBoardLayout
      isRevision={isRevision}
      onConfirm={onConfirm}
      transactionFee={transactionFee}
      advanced={advanced}
      handleAdvanced={handleAdvanced}
    >
      <GasFeeInputsEIP1559
        maxFeePerGas={maxFeePerGas}
        maxPriorityFeePerGas={maxPriorityFeePerGas}
        gasLimit={gasLimit}
        setMaxFeePerGas={setMaxFeePerGas}
        setMaxPriorityFeePerGas={setMaxPriorityFeePerGas}
        setGasLimit={setGasLimit}
      />
      <GasLevelRadioButtons setGasLevel={setGasLevel} gasLevel={gasLevel} />
    </GasFeeBoardLayout>
  );
}
export default GasFeeBoardEip1559;
