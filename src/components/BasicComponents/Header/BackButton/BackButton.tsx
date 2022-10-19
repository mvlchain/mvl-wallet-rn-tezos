import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';

import { BackIconLight, BackIconDark } from '@@assets/image';
import { useAssetFromTheme } from '@@hooks/common/useTheme';

function BackButton() {
  const BackIcon = useAssetFromTheme(BackIconLight, BackIconDark);
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        navigation.goBack();
      }}
    >
      <BackIcon />
    </Pressable>
  );
}

export default BackButton;
