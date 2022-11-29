import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { commify } from 'ethers/lib/utils';
import { Pressable } from 'react-native';

import * as TokenIcon from '@@assets/image/token';
import { ROOT_STACK_ROUTE, TRootStackNavigationProps } from '@@navigation/RootStack/RootStack.type';
import settingPersistStore from '@@store/setting/settingPersistStore';

import * as S from './TokenListItem.style';
import { ITokenListItemProps } from './TokenListItem.type';

function TokenListItem({ ticker, balance, valuatedPrice }: ITokenListItemProps) {
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
            {commify(balance)} {ticker}
          </S.Text>
          <S.AmountUSD>
            {commify(valuatedPrice)} {settedCurrency}
          </S.AmountUSD>
        </S.ValueContainer>
      </S.Container>
    </Pressable>
  );
}

export default TokenListItem;
