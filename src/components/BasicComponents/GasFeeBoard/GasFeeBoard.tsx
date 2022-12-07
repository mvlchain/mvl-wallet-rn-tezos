import React from 'react';

import { IGasFeeBoardProps } from './GasFeeBoard.type';
import GasFeeBoardLayout from './GasFeeBoardLayout/GasFeeBoardLayout';
import GasFeeInputs from './GasFeeInputs';
import GasLevelRadioButtons from './GasLevelRadioButtons';
import useGasFeeBoard from './useGasFeeBoard';

function GasFeeBoard({ isRevision, onConfirm, tokenDto }: IGasFeeBoardProps) {
  const {
    advanced,
    gasLevel,
    gasLimit,
    enableTip,
    enableLimitCustom,
    estimatedGas,
    customBaseFee,
    customTip,
    customGasLimit,
    transactionFee,
    setGasLevel,
    setCustomBaseFee,
    setCustomTip,
    setCustomGasLimit,
    toggleGasAdvanced,
    onConfirmGasFee,
  } = useGasFeeBoard(tokenDto, onConfirm);
  return (
    <GasFeeBoardLayout
      isRevision={isRevision}
      onConfirm={onConfirmGasFee}
      transactionFee={transactionFee}
      advanced={advanced}
      toggleGasAdvanced={toggleGasAdvanced}
    >
      <GasLevelRadioButtons setGasLevel={setGasLevel} gasLevel={gasLevel} />
      <GasFeeInputs
        enableTip={enableTip}
        enableLimitCustom={enableLimitCustom}
        customBaseFee={customBaseFee}
        customTip={customTip}
        customGasLimit={customGasLimit}
        setCustomBaseFee={setCustomBaseFee}
        setCustomTip={setCustomTip}
        setCustomGasLimit={setCustomGasLimit}
      />
    </GasFeeBoardLayout>
  );
}
export default GasFeeBoard;
