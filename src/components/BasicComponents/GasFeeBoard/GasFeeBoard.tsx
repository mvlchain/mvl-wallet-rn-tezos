import React from 'react';

import { IGasFeeBoardProps } from './GasFeeBoard.type';
import GasFeeBoardLayout from './GasFeeBoardLayout/GasFeeBoardLayout';
import GasFeeInputs from './GasFeeInputs';
import GasLevelRadioButtons from './GasLevelRadioButtons';
import useGasFeeBoard from './useGasFeeBoard';

function GasFeeBoard({ isRevision, onConfirm, tokenDto, isValid }: IGasFeeBoardProps) {
  const {
    advanced,
    gasLevel,
    enableTip,
    enableLimitCustom,
    customBaseFee,
    customTip,
    customGas,
    transactionFee,
    setGasLevel,
    setCustomBaseFee,
    setCustomTip,
    setCustomGas,
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
      isValid={isValid}
    >
      <GasLevelRadioButtons setGasLevel={setGasLevel} gasLevel={gasLevel} />
      <GasFeeInputs
        enableTip={enableTip}
        enableLimitCustom={enableLimitCustom}
        customBaseFee={customBaseFee}
        customTip={customTip}
        customGas={customGas}
        setCustomBaseFee={setCustomBaseFee}
        setCustomTip={setCustomTip}
        setCustomGas={setCustomGas}
      />
    </GasFeeBoardLayout>
  );
}
export default GasFeeBoard;
