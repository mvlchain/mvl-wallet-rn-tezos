import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';
import { Pressable } from 'react-native';

import CustomRadio from '@@components/Form/CustomRadio';

import * as S from './SpeedRadioButtons.style';

function SpeedRadioButtons() {
  const { t } = useTranslation();
  return (
    <>
      <S.Label>{t('speed')}</S.Label>
      <S.ButtonWrapper>
        <CustomRadio options={options} />
      </S.ButtonWrapper>
    </>
  );
}

export default SpeedRadioButtons;

const options = [
  { label: 'Low', onPress: () => {} },
  { label: 'Mid', onPress: () => {} },
  { label: 'High', onPress: () => {} },
];
