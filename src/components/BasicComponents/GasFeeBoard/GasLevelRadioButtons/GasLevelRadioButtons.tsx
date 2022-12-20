import React from 'react';

import { useTranslation } from 'react-i18next';

import CustomRadio from '@@components/BasicComponents/Form/CustomRadio';
import { GAS_LEVEL } from '@@constants/gas.constant';
import gasStore from '@@store/gas/gasStore';

import * as S from './GasLevelRadioButtons.style';

function GasLevelRadioButtons() {
  const { t } = useTranslation();
  const { level, setState } = gasStore();

  const options = [
    {
      label: t('speed_low'),
      level: GAS_LEVEL.LOW,
      onPress: () => {
        setState({ level: GAS_LEVEL.LOW });
      },
    },
    {
      label: t('speed_mid'),
      level: GAS_LEVEL.MID,
      onPress: () => {
        setState({ level: GAS_LEVEL.MID });
      },
    },
    {
      label: t('speed_high'),
      level: GAS_LEVEL.HIGH,
      onPress: () => {
        setState({ level: GAS_LEVEL.HIGH });
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
