import React from 'react';

import GasFeeInputsTezos from '../../GasFeeInputs/GasFeeInputsTezos';
import GasLevelRadioButtons from '../../GasLevelRadioButtons';
import GasFeeBoardLayout from '../GasFeeBoardLayout';

import { IGasFeeBoardTezosProps } from './GasFeeBoardTezos.type';
import useGasFeeTezos from './useGasFeeTzos';

//TODO: 테조스 타입
function GasFeeBoardTezos({ isRevision, onConfirm }: IGasFeeBoardTezosProps) {
  const { advanced, gasLevel, baseFee, additionalFee, transactionFee, setAdditionalFee, setGasLevel, handleAdvanced } = useGasFeeTezos();
  return (
    <GasFeeBoardLayout
      isRevision={isRevision}
      onConfirm={onConfirm}
      transactionFee={transactionFee}
      advanced={advanced}
      handleAdvanced={handleAdvanced}
    >
      <GasFeeInputsTezos baseFee={baseFee} additionalFee={additionalFee} setAdditionalFee={setAdditionalFee} />
      <GasLevelRadioButtons setGasLevel={setGasLevel} gasLevel={gasLevel} />
    </GasFeeBoardLayout>
  );
}
export default GasFeeBoardTezos;
