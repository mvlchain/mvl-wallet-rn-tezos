import React from 'react';

import { useTranslation } from 'react-i18next';

import { GasTextField } from '@@components/BasicComponents/TextFields/GasTextField';
import { height } from '@@utils/ui';

import * as S from './GasFeeInputs.style';
import { IGasFeeInputsProps } from './GasFeeInputs.type';

function GasFeeInputs({
  enableTip,
  enableLimitCustom,
  customBaseFee,
  customTip,
  customGasLimit,
  setCustomBaseFee,
  setCustomTip,
  setCustomGasLimit,
}: IGasFeeInputsProps) {
  const { t } = useTranslation();

  return (
    <S.Container>
      <S.Label>{t('gas_price')}</S.Label>
      <S.InputWrapper>
        <GasTextField value={customBaseFee} setValue={setCustomBaseFee} unit={'gwei'} />
      </S.InputWrapper>
      {enableTip && (
        <>
          <S.Label>{t('gas_price')}</S.Label>
          <S.InputWrapper>
            <GasTextField value={customTip} setValue={setCustomTip} unit={'gwei'} />
          </S.InputWrapper>
        </>
      )}
      {enableLimitCustom && (
        <>
          <S.Label style={{ marginTop: height * 24 }}>{t('gas_limit')}</S.Label>
          <S.InputWrapper>
            <GasTextField value={customGasLimit} setValue={setCustomGasLimit} />
          </S.InputWrapper>
        </>
      )}
    </S.Container>
  );
}

export default GasFeeInputs;
