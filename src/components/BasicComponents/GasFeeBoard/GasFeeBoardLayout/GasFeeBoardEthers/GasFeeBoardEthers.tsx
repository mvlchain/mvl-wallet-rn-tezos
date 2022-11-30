import React from 'react';

import GasFeeInputs from '../../GasFeeInputs/GasFeeInputsEthers';
import GasLevelRadioButtons from '../../GasLevelRadioButtons';
import GasFeeBoardLayout from '../GasFeeBoardLayout';

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
      <GasLevelRadioButtons setGasLevel={setGasLevel} gasLevel={gasLevel} />
      <GasFeeInputs gasPrice={gasPrice} gasLimit={gasLimit} setGasPrice={setGasPrice} setGasLimit={setGasLimit} />
    </GasFeeBoardLayout>
  );
}
export default GasFeeBoardEthers;
