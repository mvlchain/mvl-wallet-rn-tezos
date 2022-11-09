import React from 'react';

import { useTranslation } from 'react-i18next';

import * as S from './SpeedRadioButtons.style';
function SpeedRadioButtons() {
  const { t } = useTranslation();
  return (
    <S.ButtonWrapper>
      <S.Low title={t('low')} />
      <S.Middle title={t('mid')} />
      <S.High title={t('high')} />
    </S.ButtonWrapper>
  );
}

export default SpeedRadioButtons;
