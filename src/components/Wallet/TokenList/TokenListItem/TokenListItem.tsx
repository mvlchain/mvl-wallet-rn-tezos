import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { Pressable, View } from 'react-native';
import { SvgUri } from 'react-native-svg';

import { ROOT_STACK_ROUTE, TRootStackNavigationProps } from '@@navigation/RootStack/RootStack.type';
import { width } from '@@utils/ui';

import * as S from './TokenListItem.style';
import { ITokenListItemProps } from './TokenListItem.type';

function TokenListItem({ asset, amount, valuatedAmount, valuatedCurrency }: ITokenListItemProps) {
  const { ticker, iconUrl } = asset;
  type rootStackProps = TRootStackNavigationProps<'MAIN'>;
  const navigation = useNavigation<rootStackProps>();
  return (
    <Pressable
      onPress={() => {
        navigation.navigate(ROOT_STACK_ROUTE.WALLET_TOKEN_DETAIL, { symbol: ticker });
      }}
    >
      <S.Container>
        <S.LabelContainer>
          {iconUrl && (
            <S.IconWrapper>
              <SvgUri uri={iconUrl} width={`${width * 36}`} height={`${width * 36}`} />
            </S.IconWrapper>
          )}
          <S.Name>{ticker}</S.Name>
        </S.LabelContainer>
        <View>
          <S.Text>
            {amount} {ticker}
          </S.Text>
          <S.AmountUSD>
            {valuatedAmount} {valuatedCurrency}
          </S.AmountUSD>
        </View>
      </S.Container>
    </Pressable>
  );
}

export default TokenListItem;
