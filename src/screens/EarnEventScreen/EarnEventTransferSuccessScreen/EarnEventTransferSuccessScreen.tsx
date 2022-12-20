import React from 'react';

import { useTranslation } from 'react-i18next';

import { SuccessIcon } from '@@assets/image';
import { PrimaryButton } from '@@components/BasicComponents/Buttons/BaseButton';

import * as S from './EarnEventTransferSuccessScreen.style';
import { useEarnEventTransferSuccessScreen } from './useEarnEventTransferSuccessScreen';

function EarnEventTransferSuccessScreen() {
  const { t } = useTranslation();
  const { onPressConfirm } = useEarnEventTransferSuccessScreen();

  return (
    <S.Container>
      <S.ContentContainer>
        <SuccessIcon />
        <S.Title>{t('await_title_transfer_completed')}</S.Title>
        <S.Description>{t('await_description_transfer_completed')}</S.Description>
      </S.ContentContainer>
      <S.ButtonWrapper>
        <PrimaryButton onPress={onPressConfirm} label={t('btn_confirm')} />
      </S.ButtonWrapper>
    </S.Container>
  );
}

export default EarnEventTransferSuccessScreen;
