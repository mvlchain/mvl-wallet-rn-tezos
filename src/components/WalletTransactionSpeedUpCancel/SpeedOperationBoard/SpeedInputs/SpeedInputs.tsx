import React from 'react';

import { useTranslation } from 'react-i18next';

import { GasTextField } from '@@components/BasicComponents/TextFields/GasTextField';
import { height } from '@@utils/ui';

import * as S from './SpeedInputs.style';
import { ISpeedInputsProps } from './SpeedInputs.type';

function SpeedInputs({ gasPrice, gasLimit, setGasPrice, setGasLimit }: ISpeedInputsProps) {
  const { t } = useTranslation();

  return (
    <S.Container>
      <S.Label>{t('gas_price')}</S.Label>
      <S.InputWrapper>
        <GasTextField value={gasPrice} setValue={setGasPrice} unit={'gwei'} />
      </S.InputWrapper>
      <S.Label style={{ marginTop: height * 24 }}>{t('gas_limit')}</S.Label>
      <S.InputWrapper>
        <GasTextField value={gasLimit} setValue={setGasLimit} />
      </S.InputWrapper>
    </S.Container>
  );
}

export default SpeedInputs;
