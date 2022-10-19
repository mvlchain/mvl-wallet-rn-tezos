import React from 'react';

import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import { PrimaryButton } from '@@components/BasicComponents/Buttons/BaseButton';
import Check from '@@components/Form/Check';
import { useToggle } from '@@hooks/common/useToggle';

import * as S from './SettingDeleteAccount.style';
import useSettingDeleteAccount from './useSettingDeleteAccount';

function SettingDeleteAccount() {
  const { t } = useTranslation();
  const [isChecked, toggle] = useToggle();
  const { onPressDeleteButton } = useSettingDeleteAccount();

  return (
    <S.DeleteAccountContainer>
      <S.DescriptionText>{t('delete_account_description')}</S.DescriptionText>
      <S.AgreeDeleteContainer>
        <Check checked={isChecked} onPress={toggle}>
          <S.AgreeText>{t('delete_account_agreement')}</S.AgreeText>
        </Check>
        <PrimaryButton onPress={onPressDeleteButton} label={t('delete_account')} disabled={!isChecked} wrapperStyle={S.inlineStyles.marginTop} />
      </S.AgreeDeleteContainer>
    </S.DeleteAccountContainer>
  );
}

export default SettingDeleteAccount;
