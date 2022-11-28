import React from 'react';

import GasFeeBoardLayout from '../GasFeeBoardLayout/GasFeeBoardLayout';
import GasFeeInputs from '../GasFeeInputs';
import GasLevelRadioButtons from '../GasLevelRadioButtons';

import { IGasFeeBoardEthersProps } from './GasFeeBoardEthers.type';
import useGasFee from './useGasFee';

function GasFeeBoardEthers({ isRevision, onConfirm }: IGasFeeBoardEthersProps) {
  const { gasPrice, gasLimit, transactionFee, advanced, gasLevel, setGasLevel, handleAdvanced, setGasLimit, setGasPrice } = useGasFee();
  return (
    <GasFeeBoardLayout
      isRevision={isRevision}
      onConfirm={onConfirm}
      transactionFee={transactionFee}
      advanced={advanced}
      handleAdvanced={handleAdvanced}
    >
      <GasFeeInputs gasPrice={gasPrice} gasLimit={gasLimit} setGasPrice={setGasPrice} setGasLimit={setGasLimit} />
      <GasLevelRadioButtons setGasLevel={setGasLevel} gasLevel={gasLevel} />
    </GasFeeBoardLayout>
  );
}
export default GasFeeBoardEthers;
