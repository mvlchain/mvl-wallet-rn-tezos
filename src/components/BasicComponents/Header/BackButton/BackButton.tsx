import React from 'react';

import { useNavigation } from '@react-navigation/native';

import { BackIconLight, BackIconDark } from '@@assets/image';
import { useAssetFromTheme } from '@@hooks/common/useTheme';

import * as S from './BackButton.style';

function BackButton() {
  const BackIcon = useAssetFromTheme(BackIconLight, BackIconDark);
  const navigation = useNavigation();
  return (
    <S.Pressable
      onPress={() => {
        navigation.goBack();
      }}
    >
      <BackIcon />
    </S.Pressable>
  );
}

export default BackButton;
