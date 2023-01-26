import React from 'react';

import { useTranslation } from 'react-i18next';
import ErrorBoundary from 'react-native-error-boundary';

import { PrimaryButton } from '@@components/BasicComponents/Buttons/BaseButton';
import ErrorScreenInRootStack from '@@components/BasicComponents/ErrorBoundary/ErrorScreenInRootStack';
import Check from '@@components/BasicComponents/Form/Check';
import { useToggle } from '@@hooks/useToggle';

import * as S from './SettingDeleteAccountScreen.style';
import useSettingDeleteAccountScreen from './useSettingDeleteAccountScreen';

function SettingDeleteAccountScreen() {
  const { t } = useTranslation();
  const [isAgree, toggle] = useToggle();
  const { onPressDeleteButton } = useSettingDeleteAccountScreen();

  return (
    <ErrorBoundary FallbackComponent={ErrorScreenInRootStack}>
      <S.DeleteAccountContainer>
        <S.DescriptionText>{t('delete_account_description')}</S.DescriptionText>
        <S.AgreeDeleteContainer>
          <Check checked={isAgree} onPress={toggle}>
            <S.AgreeText>{t('delete_account_agreement')}</S.AgreeText>
          </Check>
          <PrimaryButton onPress={onPressDeleteButton} label={t('delete_account')} disabled={!isAgree} wrapperStyle={S.inlineStyles.marginTop} />
        </S.AgreeDeleteContainer>
      </S.DeleteAccountContainer>
    </ErrorBoundary>
  );
}

export default SettingDeleteAccountScreen;
