import React from 'react';

import { useTranslation } from 'react-i18next';

import CustomRadio from '@@components/BasicComponents/Form/CustomRadio';
import { GAS_LEVEL, TGasLevel } from '@@constants/gas.constant';

import * as S from './GasLevelRadioButtons.style';

function GasLevelRadioButtons({ level, setLevel }: { level: TGasLevel; setLevel: (level: TGasLevel) => void }) {
  const { t } = useTranslation();

  const options = [
    {
      label: t('speed_low'),
      level: GAS_LEVEL.LOW,
      onPress: () => {
        setLevel(GAS_LEVEL.LOW);
      },
    },
    {
      label: t('speed_mid'),
      level: GAS_LEVEL.MID,
      onPress: () => {
        setLevel(GAS_LEVEL.MID);
      },
    },
    {
      label: t('speed_high'),
      level: GAS_LEVEL.HIGH,
      onPress: () => {
        setLevel(GAS_LEVEL.HIGH);
      },
    },
  ];

  return (
    <>
      <S.Label>{t('speed')}</S.Label>
      <S.ButtonWrapper>
        <CustomRadio options={options} defaultIdx={options.findIndex((v, i) => v.level === level)} />
      </S.ButtonWrapper>
    </>
  );
}

export default GasLevelRadioButtons;
