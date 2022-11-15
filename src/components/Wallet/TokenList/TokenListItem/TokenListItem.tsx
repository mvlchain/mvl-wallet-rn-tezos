import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { Pressable, View } from 'react-native';

import * as TokenIcon from '@@assets/image/token';
import { ROOT_STACK_ROUTE, TRootStackNavigationProps } from '@@navigation/RootStack/RootStack.type';

import * as S from './TokenListItem.style';
import { ITokenListItemProps } from './TokenListItem.type';

function TokenListItem({ amount, amountUSD, icon, name }: ITokenListItemProps) {
  type rootStackProps = TRootStackNavigationProps<'MAIN'>;
  const navigation = useNavigation<rootStackProps>();
  const TokenImage = TokenIcon[icon ?? 'Mvl'];
  return (
    <Pressable
      onPress={() => {
        navigation.navigate(ROOT_STACK_ROUTE.WALLET_TOKEN_DETAIL, { symbol: name });
      }}
    >
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
    </Pressable>
  );
}

export default TokenListItem;
