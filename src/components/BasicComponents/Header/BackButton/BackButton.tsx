import React from 'react';

import { useNavigation } from '@react-navigation/native';

import { BackIconLight, BackIconDark } from '@@assets/image';
import { IBackButtonProps } from '@@hooks/common/useHeader/useHeader.type';
import { useAssetFromTheme } from '@@hooks/common/useTheme';

import * as S from './BackButton.style';

function BackButton({ onPressBack, isDisableBack }: IBackButtonProps) {
  const BackIcon = useAssetFromTheme(BackIconLight, BackIconDark);
  const navigation = useNavigation();
  return (
    <S.Pressable
      onPress={() => {
        if (onPressBack) {
          onPressBack();
        }
        if (!isDisableBack) {
          navigation.goBack();
        }
      }}
    >
      <BackIcon />
    </S.Pressable>
  );
}

export default BackButton;
