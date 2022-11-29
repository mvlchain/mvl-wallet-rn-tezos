import React from 'react';

import { useTranslation } from 'react-i18next';

import { GasTextField } from '@@components/BasicComponents/TextFields/GasTextField';
import { height } from '@@utils/ui';

import * as S from '../GasFeeInputs.style';

import { IGasFeeInputsTezosProps } from './GasFeeInputsTezos.type';

function GasFeeInputsTezos({ baseFee, additionalFee, setAdditionalFee }: IGasFeeInputsTezosProps) {
  const { t } = useTranslation();

  return (
    <S.Container>
      {/* TODO: 다국어 요청 */}
      <S.Label>{t('base_fee')}</S.Label>
      <S.InputWrapper>
        <GasTextField defaultValue={baseFee} unit={'tez'} disabled={true} />
      </S.InputWrapper>
      <S.Label style={{ marginTop: height * 24 }}>{t('additional_fee')}</S.Label>
      <S.InputWrapper>
        <GasTextField value={additionalFee} setValue={setAdditionalFee} unit={'gwei'} />
      </S.InputWrapper>
    </S.Container>
  );
}

export default GasFeeInputsTezos;
