import React from 'react';

import { useTranslation } from 'react-i18next';

import { SuccessIcon } from '@@assets/image';
import { PrimaryButton } from '@@components/BasicComponents/Buttons/BaseButton';

import * as S from './SettingDeleteAccountSuccessScreen.style';
import useSettingDeleteAccountSuccessScreen from './useSettingDeleteAccountSuccessScreen';

function SettingDeleteAccountSuccessScreen() {
  const { t } = useTranslation();
  const { onPressConfirm } = useSettingDeleteAccountSuccessScreen();

  return (
    <S.Container>
      <S.ImageContainer>
        <SuccessIcon />
        <S.SuccessText>{t('delete_account_successfully')}</S.SuccessText>
      </S.ImageContainer>
      <PrimaryButton label={t('btn_confirm')} onPress={onPressConfirm} wrapperStyle={S.inlineStyles.margin} />
    </S.Container>
  );
}

export default SettingDeleteAccountSuccessScreen;
