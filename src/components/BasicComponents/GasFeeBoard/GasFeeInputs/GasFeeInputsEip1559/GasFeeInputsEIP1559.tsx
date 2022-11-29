import React from 'react';

import { useTranslation } from 'react-i18next';

import { GasTextField } from '@@components/BasicComponents/TextFields/GasTextField';
import { height } from '@@utils/ui';

import * as S from '../GasFeeInputs.style';

import { ISpeedInputsEIP1559Props } from './GasFeeInputsEIP1559.type';

function GasFeeInputsEIP1559({
  maxFeePerGas,
  maxPriorityFeePerGas,
  gasLimit,
  setMaxFeePerGas,
  setMaxPriorityFeePerGas,
  setGasLimit,
}: ISpeedInputsEIP1559Props) {
  const { t } = useTranslation();

  return (
    <S.Container>
      <S.Label>{t('max_fee_per_gas')}</S.Label>
      <S.InputWrapper>
        <GasTextField value={maxFeePerGas} setValue={setMaxFeePerGas} unit={'gwei'} />
      </S.InputWrapper>
      <S.Label style={{ marginTop: height * 24 }}>{t('max_priority_fee_per_gas')}</S.Label>
      <S.InputWrapper>
        <GasTextField value={maxPriorityFeePerGas} setValue={setMaxPriorityFeePerGas} unit={'gwei'} />
      </S.InputWrapper>
      <S.Label style={{ marginTop: height * 24 }}>{t('gas_limit')}</S.Label>
      <S.InputWrapper>
        <GasTextField value={gasLimit} setValue={setGasLimit} />
      </S.InputWrapper>
    </S.Container>
  );
}

export default GasFeeInputsEIP1559;
