import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { commify } from 'ethers/lib/utils';
import { Pressable } from 'react-native';
import { SvgUri } from 'react-native-svg';

import { ROOT_STACK_ROUTE, TRootStackNavigationProps } from '@@navigation/RootStack/RootStack.type';
import settingPersistStore from '@@store/setting/settingPersistStore';
import { width } from '@@utils/ui';

import * as S from './TokenListItem.style';
import { ITokenListItemProps } from './TokenListItem.type';

function TokenListItem({ ticker, balance, valuatedPrice, logoURI, tokenDto }: ITokenListItemProps) {
  type rootStackProps = TRootStackNavigationProps<'MAIN'>;
  const navigation = useNavigation<rootStackProps>();
  const { settedCurrency } = settingPersistStore();

  return (
    <Pressable
      onPress={() => {
        navigation.navigate(ROOT_STACK_ROUTE.WALLET_TOKEN_DETAIL, { tokenDto });
      }}
    >
      <S.Container>
        <S.LabelContainer>
          {logoURI && (
            <S.IconWrapper>
              <SvgUri uri={logoURI} width={`${width * 36}`} height={`${width * 36}`} />
            </S.IconWrapper>
          )}
          <S.Name>{ticker}</S.Name>
        </S.LabelContainer>
        <S.ValueContainer>
          <S.Text>
            {commify(balance.toString())} {ticker}
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
