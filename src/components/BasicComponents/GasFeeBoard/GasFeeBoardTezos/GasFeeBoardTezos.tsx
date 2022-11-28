import React from 'react';

import GasFeeBoardLayout from '../GasFeeBoardLayout/GasFeeBoardLayout';
import GasFeeInputs from '../GasFeeInputs';
import GasLevelRadioButtons from '../GasLevelRadioButtons';

import useGasFeeTezos from './useGasFeeTzos';

//TODO: 테조스 타입
function GasFeeBoardTezos({ isRevision, onConfirm }: any) {
  const { advanced, gasLevel, baseFee, additionalFee, transactionFee, setAdditionalFee, setGasLevel, handleAdvanced } = useGasFeeTezos();
  return (
    <></>
    // <GasFeeBoardLayout
    //   isRevision={isRevision}
    //   onConfirm={onConfirm}
    //   transactionFee={transactionFee}
    //   advanced={advanced}
    //   handleAdvanced={handleAdvanced}
    //   GasFeeInputs={<GasFeeInputs gasPrice={gasPrice} gasLimit={gasLimit} setGasPrice={setGasPrice} setGasLimit={setGasLimit} />}
    //   GasLevelRadioButtons={<GasLevelRadioButtons setGasLevel={setGasLevel} gasLevel={gasLevel} />}
    // />
  );
}
export default GasFeeBoardTezos;
