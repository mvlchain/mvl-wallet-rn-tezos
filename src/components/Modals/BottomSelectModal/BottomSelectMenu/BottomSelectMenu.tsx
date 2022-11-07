import React from 'react';

import { Pressable } from 'react-native';

import { SelectIcon } from '@@assets/image';

import * as S from './BottomSelectMenu.style';
import { IBottomSelectMenuProps } from './BottomSelectMenu.type';

function BottomSelectMenu({ title, isSelected, onPress }: IBottomSelectMenuProps) {
  return (
    <Pressable onPress={onPress}>
      <S.MenuContainer>
        <S.MenuText>{title}</S.MenuText>
        {isSelected && <SelectIcon />}
      </S.MenuContainer>
    </Pressable>
  );
}

export default BottomSelectMenu;
