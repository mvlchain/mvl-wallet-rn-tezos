import React from 'react';

import { Pressable } from 'react-native';

import { SelectIcon } from '@@assets/image';

import * as S from './BottomSelectMenu.style';
import { IBottomSelectMenuProps } from './BottomSelectMenu.type';

function BottomSelectMenu({ title, isSelected, Logo, onPress }: IBottomSelectMenuProps) {
  return (
    <Pressable onPress={onPress}>
      <S.MenuContainer>
        <S.Wrapper>
          {Logo && <Logo />}
          <S.MenuText>{title}</S.MenuText>
        </S.Wrapper>
        {isSelected && <SelectIcon />}
      </S.MenuContainer>
    </Pressable>
  );
}

export default BottomSelectMenu;
