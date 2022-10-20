import React from 'react';

import { useTranslation } from 'react-i18next';

import { SuccessIcon } from '@@assets/image';
import { PrimaryButton } from '@@components/BasicComponents/Buttons/BaseButton';

import * as S from './SettingDeleteAccountSuccess.style';
import useSettingDeleteAccountSuccess from './useSettingDeleteAccountSuccess';

function SettingDeleteAccountSuccess() {
  const { t } = useTranslation();
  const { onPressConfirm } = useSettingDeleteAccountSuccess();

  return (
    <>
      <S.ImageContainer>
        <SuccessIcon />
        <S.SuccessText>{t('delete_account_successfully')}</S.SuccessText>
      </S.ImageContainer>
      <PrimaryButton label={t('btn_confirm')} onPress={onPressConfirm} wrapperStyle={S.inlineStyles.margin} />
    </>
  );
}

export default SettingDeleteAccountSuccess;
