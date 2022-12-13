import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';
import { Pressable } from 'react-native';

import CustomRadio from '@@components/BasicComponents/Form/CustomRadio';
import { GAS_LEVEL } from '@@constants/gas.constant';

import * as S from './GasLevelRadioButtons.style';
import { IGasLevelRadioButtonsProps } from './GasLevelRadioButtons.type';

function GasLevelRadioButtons({ setGasLevel, gasLevel }: IGasLevelRadioButtonsProps) {
  const { t } = useTranslation();

  const options = [
    {
      label: t('speed_low'),
      level: GAS_LEVEL.LOW,
      onPress: () => {
        setGasLevel(GAS_LEVEL.LOW);
      },
    },
    {
      label: t('speed_mid'),
      level: GAS_LEVEL.MID,
      onPress: () => {
        setGasLevel(GAS_LEVEL.MID);
      },
    },
    {
      label: t('speed_high'),
      level: GAS_LEVEL.HIGH,
      onPress: () => {
        setGasLevel(GAS_LEVEL.HIGH);
      },
    },
  ];

  return (
    <>
      <S.Label>{t('speed')}</S.Label>
      <S.ButtonWrapper>
        <CustomRadio options={options} defaultIdx={options.findIndex((v, i) => v.level === gasLevel)} />
      </S.ButtonWrapper>
    </>
  );
}

export default GasLevelRadioButtons;
