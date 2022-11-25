import React from 'react';

import { Text, View } from 'react-native';

import { ClutchImageLight, ClutchImageDark } from '@@assets/image';
import { SecondaryButton } from '@@components/BasicComponents/Buttons/BaseButton';
import { useAssetFromTheme } from '@@hooks/useTheme';

import * as S from './SettingAppVersionScreen.style';
/**
 * TODO:
 * 1. 앱 버전 확인 후 rendering
 * 2. 앱 버전에 따른 버튼 label, onPress, disabled수정
 */
function SettingAppVersionScreen() {
  const ClutchImage = useAssetFromTheme(ClutchImageLight, ClutchImageDark);
  return (
    <S.AppVersionContainer>
      <S.ClutchImageContainer>
        <ClutchImage />
      </S.ClutchImageContainer>
      <SecondaryButton onPress={() => console.log('TODO: 앱버전 확인하기')} label={'Check for Update'} wrapperStyle={S.inlineStyles.margin} />
      <S.AppText>Version 1.0</S.AppText>
    </S.AppVersionContainer>
  );
}

export default SettingAppVersionScreen;
