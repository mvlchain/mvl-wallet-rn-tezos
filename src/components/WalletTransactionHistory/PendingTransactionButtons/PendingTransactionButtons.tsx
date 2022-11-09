import React from 'react';

import { useTranslation } from 'react-i18next';

import { PrimaryButton, SecondaryButton } from '@@components/BasicComponents/Buttons/BaseButton';

import * as S from './PendingTransactionButtons.style';

function PendingTransactionButtons() {
  const { t } = useTranslation();

  return (
    <S.Container>
      <SecondaryButton label={t('btn_cancel')} onPress={() => {}} wrapperStyle={{ flex: 1 }} />
      <S.Gap />
      <PrimaryButton label={t('speedup')} onPress={() => {}} wrapperStyle={{ flex: 1 }} />
    </S.Container>
  );
}
export default PendingTransactionButtons;
