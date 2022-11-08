import React from 'react';

import { View } from 'react-native';

import * as TokenIcon from '@@assets/image/token';

import * as S from './TokenListItem.style';
import { ITokenListItemProps } from './TokenListItem.type';

function TokenListItem({ amount, amountUSD, icon, name }: ITokenListItemProps) {
  const TokenImage = TokenIcon[icon ?? 'Mvl'];
  return (
    <S.Container>
      <S.LabelContainer>
        <TokenImage />
        <S.Name>{name}</S.Name>
      </S.LabelContainer>
      <View>
        <S.Text>
          {amount} {name}
        </S.Text>
        <S.AmountUSD>{amountUSD} USD</S.AmountUSD>
      </View>
    </S.Container>
  );
}

export default TokenListItem;
