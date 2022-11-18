import React from 'react';

import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { TokenMVL32Icon } from '@@assets/image';
import { PrimaryButton } from '@@components/BasicComponents/Buttons/BaseButton';
import { ROOT_STACK_ROUTE } from '@@navigation/RootStack/RootStack.type';
import { TTokenDetailRouteProps } from '@@screens/WalletScreen/WalletTokenDetail/WalletTokenDetail.type';
import { TTokenSendRootStackProps } from '@@screens/WalletScreen/WalletTokenSend/WalletTokenSend.type';
import { fontSize, width, height } from '@@utils/ui';

import * as S from './TokenDetailBoard.style';

function TokenDetailBoard() {
  const { t } = useTranslation();
  //TODO: 데이터 들어오면 바꾸기
  const { balance, baseCurrencyBalance, icon } = {
    balance: 5000,
    baseCurrencyBalance: 1000000000,
    icon: () => <TokenMVL32Icon width={width * 40} height={height * 40} />,
  };

  const { params } = useRoute<TTokenDetailRouteProps>();
  const navigation = useNavigation<TTokenSendRootStackProps>();
  const gotoSend = () => {
    navigation.navigate(ROOT_STACK_ROUTE.WALLET_TOKEN_SEND, { symbol: params.symbol });
  };

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
            {baseCurrencyBalance} {'USD'}
          </S.TokenBaseCurrency>
        </S.TokenAmountWrapper>
      </S.TokenInfoContainer>
      <S.ReceiveSendContainer>
        <PrimaryButton label={t('receive')} onPress={() => {}} size={'small'} wrapperStyle={{ flex: 1 }} textStyle={{ lineHeight: fontSize(14) }} />
        <S.Gap />
        <PrimaryButton label={t('send')} onPress={gotoSend} size={'small'} wrapperStyle={{ flex: 1 }} textStyle={{ lineHeight: fontSize(14) }} />
      </S.ReceiveSendContainer>
    </View>
  );
}

export default TokenDetailBoard;
