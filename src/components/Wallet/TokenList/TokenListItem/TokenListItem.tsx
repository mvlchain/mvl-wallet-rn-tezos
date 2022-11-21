import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { Pressable, View } from 'react-native';

import * as TokenIcon from '@@assets/image/token';
import { ROOT_STACK_ROUTE, TRootStackNavigationProps } from '@@navigation/RootStack/RootStack.type';
import settingPersistStore from '@@store/setting/settingPersistStore';
import numberFormatter from '@@utils/numberFormatter';

import * as S from './TokenListItem.style';
import { ITokenListItemProps } from './TokenListItem.type';

function TokenListItem({ ticker, balance, valuatedAmount }: ITokenListItemProps) {
  type rootStackProps = TRootStackNavigationProps<'MAIN'>;
  const navigation = useNavigation<rootStackProps>();
  const TokenImage = TokenIcon[ticker as keyof typeof TokenIcon];
  const { settedCurrency } = settingPersistStore();

  return (
    <Pressable
      onPress={() => {
        navigation.navigate(ROOT_STACK_ROUTE.WALLET_TOKEN_DETAIL, { symbol: ticker });
      }}
    >
      <S.Container>
        <S.LabelContainer>
          <TokenImage />
          <S.Name>{ticker}</S.Name>
        </S.LabelContainer>
        <S.ValueContainer>
          <S.Text>
            {numberFormatter.setComma(balance)} {ticker}
          </S.Text>
          <S.AmountUSD>
            {numberFormatter.setComma(valuatedAmount)} {settedCurrency}
          </S.AmountUSD>
        </S.ValueContainer>
      </S.Container>
    </Pressable>
  );
}

export default TokenListItem;
