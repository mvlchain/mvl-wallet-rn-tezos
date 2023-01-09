import React from 'react';

import { Pressable } from 'react-native';

import { SelectIcon } from '@@assets/image';
import SymbolImage from '@@components/BasicComponents/SymbolImage';

import * as S from './BottomSelectMenu.style';
import { IBottomSelectMenuProps } from './BottomSelectMenu.type';

function BottomSelectMenu({ title, isSelected, logo, onPress }: IBottomSelectMenuProps) {
  return (
    <Pressable onPress={onPress}>
      <S.MenuContainer>
        <S.Wrapper>
          {logo && (
            <S.IconWrapper>
              <SymbolImage symbolURI={logo} size={36} />
            </S.IconWrapper>
          )}
          <S.MenuText>{title}</S.MenuText>
        </S.Wrapper>
        {isSelected && <SelectIcon />}
      </S.MenuContainer>
    </Pressable>
  );
}

export default BottomSelectMenu;
