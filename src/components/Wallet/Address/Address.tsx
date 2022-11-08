import React from 'react';

import { View, Text } from 'react-native';

import { CopyIcon } from '@@assets/image';

import * as S from './Address.style';
import { IAddressProps } from './Address.type';

function Address(props: IAddressProps) {
  return (
    <View>
      <S.Label>Address</S.Label>
      <S.AddressContainer>
        <S.AddressText>0xE4de5635351F5fa0e1e8b85642B25605</S.AddressText>
        <CopyIcon style={S.styles.copyIcon} />
      </S.AddressContainer>
    </View>
  );
}

export default Address;
