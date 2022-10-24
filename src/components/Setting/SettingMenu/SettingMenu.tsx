import React from 'react';

import { Pressable } from 'react-native';

import { ChevronRightBlackIcon, ChevronRightLightIcon } from '@@assets/image';
import { useAssetFromTheme } from '@@hooks/common/useTheme';

import * as S from './SettingMenu.style';
import { ISettingMenuProps } from './SettingMenu.type';

function SettingMenu({ title, subTitle, isThickBorder, isLast, onPress }: ISettingMenuProps) {
  const Icon = useAssetFromTheme(ChevronRightLightIcon, ChevronRightBlackIcon);
  return (
    <Pressable onPress={onPress}>
      <S.SettingMenuContainer isThickBorder={isThickBorder} isLast={isLast}>
        <S.SettingMenuText>{title}</S.SettingMenuText>
        <S.SettingSubTextContainer>
          <S.SettingMenuText isSub={true}>{subTitle && subTitle}</S.SettingMenuText>
          <Icon style={S.inlineStyles.marginProvider} />
        </S.SettingSubTextContainer>
      </S.SettingMenuContainer>
    </Pressable>
  );
}

export default SettingMenu;
