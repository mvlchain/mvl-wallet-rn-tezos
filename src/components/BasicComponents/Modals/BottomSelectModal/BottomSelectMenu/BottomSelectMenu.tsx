import React from 'react';

import { Pressable } from 'react-native';
import { SvgUri } from 'react-native-svg';

import { SelectIcon } from '@@assets/image';
import { width } from '@@utils/ui';

import * as S from './BottomSelectMenu.style';
import { IBottomSelectMenuProps } from './BottomSelectMenu.type';

function BottomSelectMenu({ title, isSelected, logo, onPress }: IBottomSelectMenuProps) {
  return (
    <Pressable onPress={onPress}>
      <S.MenuContainer>
        <S.Wrapper>
          {logo && (
            <S.IconWrapper>
              <SvgUri uri={logo} width={`${width * 36}`} height={`${width * 36}`} />
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
