import React from 'react';

import GasFeeBoardLayout from '../GasFeeBoardLayout/GasFeeBoardLayout';
import GasFeeInputsEIP1559 from '../GasFeeInputs/GasFeeInputsEIP1559';
import GasLevelRadioButtons from '../GasLevelRadioButtons';

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
      GasFeeInputs={
        <GasFeeInputsEIP1559
          maxFeePerGas={maxFeePerGas}
          maxPriorityFeePerGas={maxPriorityFeePerGas}
          gasLimit={gasLimit}
          setMaxFeePerGas={setMaxFeePerGas}
          setMaxPriorityFeePerGas={setMaxPriorityFeePerGas}
          setGasLimit={setGasLimit}
        />
      }
      GasLevelRadioButtons={<GasLevelRadioButtons setGasLevel={setGasLevel} gasLevel={gasLevel} />}
    />
  );
}
export default GasFeeBoardEip1559;
