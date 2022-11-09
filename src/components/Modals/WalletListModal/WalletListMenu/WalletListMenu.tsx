import React from 'react';

import { Pressable, Text, View } from 'react-native';

import { SelectIcon } from '@@assets/image';
import Jdenticon from '@@components/Jdenticon';

import * as S from './WalletListMenu.style';
import { IWalletListMenuProps } from './WalletListMenu.type';

function WalletListMenu({ name, address, isSelected, onPress }: IWalletListMenuProps) {
  return (
    <Pressable onPress={onPress}>
      <S.MenuContainer>
        <Jdenticon value={address} />
        <S.TextContainer>
          <S.MenuText>{name}</S.MenuText>
          <S.AddressText numberOfLines={1} ellipsizeMode='middle'>
            {address}
          </S.AddressText>
        </S.TextContainer>
        <S.SelectedContainer>{isSelected && <SelectIcon />}</S.SelectedContainer>
      </S.MenuContainer>
    </Pressable>
  );
}

export default WalletListMenu;
