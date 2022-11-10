import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';
import { Pressable } from 'react-native';

import CustomRadio from '@@components/Form/CustomRadio';

import * as S from './SpeedRadioButtons.style';

function SpeedRadioButtons() {
  const { t } = useTranslation();

  const options = [
    { label: t('speed_low'), onPress: () => {} },
    { label: t('speed_mid'), onPress: () => {} },
    { label: t('speed_high'), onPress: () => {} },
  ];

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
