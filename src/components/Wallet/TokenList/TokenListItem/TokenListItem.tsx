import React from 'react';

import { useNavigation } from '@react-navigation/native';
import BigNumber from 'bignumber.js';
import { commify } from 'ethers/lib/utils';
import { Pressable } from 'react-native';

import Picture from '@@components/BasicComponents/Picture';
import { ROOT_STACK_ROUTE, TRootStackNavigationProps } from '@@navigation/RootStack/RootStack.type';
import settingPersistStore from '@@store/setting/settingPersistStore';
import { getWidth } from '@@utils/ui';

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
              <Picture url={logoURI} width={getWidth(36)} height={getWidth(36)} />
            </S.IconWrapper>
          )}
          <S.Name>{ticker}</S.Name>
        </S.LabelContainer>
        <S.ValueContainer>
          <S.Text>
            {commify(balance)} {ticker}
          </S.Text>
          <S.AmountUSD>
            {commify(new BigNumber(valuatedPrice).toFixed())} {settedCurrency}
          </S.AmountUSD>
        </S.ValueContainer>
      </S.Container>
    </Pressable>
  );
}

export default TokenListItem;
