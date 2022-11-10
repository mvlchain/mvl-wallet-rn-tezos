import React from 'react';

import { useRoute, RouteProp } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { TokenMVL32Icon } from '@@assets/image';
import { PrimaryButton } from '@@components/BasicComponents/Buttons/BaseButton';
import { TTokenDetailRouteProps } from '@@screens/Wallet/WalletTokenDetail/WalletTokenDetail.type';
import { fontSize, width, height } from '@@utils/ui';

import * as S from './TokenDetailBoard.style';

function TokenDetailBoard() {
  const { t } = useTranslation();
  //TODO: 데이터 들어오면 바꾸기
  const { symbol, balance, baseCurrencyBalance, baseCurrencySymbol, icon } = {
    symbol: 'MVL',
    balance: 5000,
    baseCurrencyBalance: 1000000000,
    baseCurrencySymbol: 'USD',
    icon: () => <TokenMVL32Icon width={width * 40} height={height * 40} />,
  };

  const { params } = useRoute<TTokenDetailRouteProps>();
  return (
    <View>
      <S.TokenInfoContainer>
        <S.TokenSymbolWrapper>
          {icon()}
          <S.TokenName>{params.symbol}</S.TokenName>
        </S.TokenSymbolWrapper>
        <S.TokenAmountWrapper>
          <S.TokenAmount>{balance}</S.TokenAmount>
          <S.TokenBaseCurrency>
            {baseCurrencyBalance} {baseCurrencySymbol}
          </S.TokenBaseCurrency>
        </S.TokenAmountWrapper>
      </S.TokenInfoContainer>
      <S.ReceiveSendContainer>
        <PrimaryButton label={t('receive')} onPress={() => {}} size={'small'} wrapperStyle={{ flex: 1 }} textStyle={{ lineHeight: fontSize(14) }} />
        <S.Gap />
        <PrimaryButton label={t('send')} onPress={() => {}} size={'small'} wrapperStyle={{ flex: 1 }} textStyle={{ lineHeight: fontSize(14) }} />
      </S.ReceiveSendContainer>
    </View>
  );
}

export default TokenDetailBoard;
