import React from 'react';

import { useTranslation } from 'react-i18next';
import ErrorBoundary from 'react-native-error-boundary';
import VersionCheck from 'react-native-version-check';

import { ClutchImageLight, ClutchImageDark } from '@@assets/image';
import { SecondaryButton } from '@@components/BasicComponents/Buttons/BaseButton';
import ErrorScreenInRootStack from '@@components/BasicComponents/ErrorBoundary/ErrorScreenInRootStack';
import { useAssetFromTheme } from '@@hooks/useTheme';

import * as S from './SettingAppVersionScreen.style';
import { useSettingAppVersionScreen } from './useSettingAppVersionScreen';

function SettingAppVersionScreen() {
  const { t } = useTranslation();
  const ClutchImage = useAssetFromTheme(ClutchImageLight, ClutchImageDark);
  const { needUpdate, onPressUpdate } = useSettingAppVersionScreen();
  return (
    <ErrorBoundary FallbackComponent={ErrorScreenInRootStack}>
      <S.AppVersionContainer>
        <S.ClutchImageContainer>
          <ClutchImage />
        </S.ClutchImageContainer>
        <SecondaryButton
          onPress={onPressUpdate}
          label={needUpdate ? t('btn_check_for_update') : t('btn_latest_version')}
          wrapperStyle={S.inlineStyles.margin}
          disabled={!needUpdate}
        />
        <S.AppText>Version {VersionCheck.getCurrentVersion()}</S.AppText>
      </S.AppVersionContainer>
    </ErrorBoundary>
  );
}

export default SettingAppVersionScreen;
