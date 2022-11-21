import React from 'react';

import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import * as TokenIcon from '@@assets/image/token';
import { PrimaryButton } from '@@components/BasicComponents/Buttons/BaseButton';
import { ROOT_STACK_ROUTE } from '@@navigation/RootStack/RootStack.type';
import { TTokenDetailRouteProps } from '@@screens/WalletScreen/WalletTokenDetail/WalletTokenDetail.type';
import { TTokenSendRootStackProps } from '@@screens/WalletScreen/WalletTokenSend/WalletTokenSend.type';
import { fontSize, width, height } from '@@utils/ui';

import * as S from './TokenDetailBoard.style';

function TokenDetailBoard() {
  const { t } = useTranslation();
  //TODO: 데이터 들어오면 바꾸기
  const { balance, baseCurrencyBalance } = {
    balance: 5000,
    baseCurrencyBalance: 1000000000,
  };
  const { params } = useRoute<TTokenDetailRouteProps>();
  const navigation = useNavigation<TTokenSendRootStackProps>();
  const gotoSend = () => {
    navigation.navigate(ROOT_STACK_ROUTE.WALLET_TOKEN_SEND, { symbol: params.symbol });
  };
  //TODO: 리스트에 없는 토큰일 결루 보여줄 심볼
  const TokenImage = TokenIcon[params.symbol ?? 'Mvl'];

  return (
    <View>
      <S.TokenInfoContainer>
        <S.TokenSymbolWrapper>
          <TokenImage />
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
