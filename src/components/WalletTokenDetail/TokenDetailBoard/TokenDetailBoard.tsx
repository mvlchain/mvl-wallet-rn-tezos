import React, { useEffect } from 'react';

import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import * as TokenIcon from '@@assets/image/token';
import { PrimaryButton } from '@@components/BasicComponents/Buttons/BaseButton';
import { useTokenBalance } from '@@hooks/useTokenBalance';
import { ROOT_STACK_ROUTE } from '@@navigation/RootStack/RootStack.type';
import { TTokenDetailRouteProps } from '@@screens/WalletScreen/WalletTokenDetail/WalletTokenDetail.type';
import { TTokenSendRootStackProps } from '@@screens/WalletScreen/WalletTokenSend/WalletTokenSend.type';
import settingPersistStore from '@@store/setting/settingPersistStore';
import { fontSize, width, height } from '@@utils/ui';

import * as S from './TokenDetailBoard.style';

function TokenDetailBoard() {
  const { t } = useTranslation();
  const { settedCurrency } = settingPersistStore();
  const { params } = useRoute<TTokenDetailRouteProps>();
  const navigation = useNavigation<TTokenSendRootStackProps>();
  const { formalizedBalance } = useTokenBalance();
  const TokenImage = TokenIcon[params.symbol as keyof typeof TokenIcon];

  const gotoSend = () => {
    navigation.navigate(ROOT_STACK_ROUTE.WALLET_TOKEN_SEND, params);
  };
  //TODO: 어레이를 계속 필터링해서 가져오는게 맞는걸까? 어차피 토큰 보기전 어레이는 갱신될텐데...토큰하나용 쿼리를 만드는게 좋은걸까?
  const selectedToken = formalizedBalance?.find((v) => params.symbol === v.ticker);

  return (
    <View>
      <S.TokenInfoContainer>
        <S.TokenSymbolWrapper>
          <TokenImage width={width * 32} height={height * 32} />
          <S.TokenName>{params.symbol}</S.TokenName>
        </S.TokenSymbolWrapper>
        <S.TokenAmountWrapper>
          <S.TokenAmount>{selectedToken?.balance ?? '-'}</S.TokenAmount>
          <S.TokenBaseCurrency>
            {selectedToken?.valuatedPrice ?? '-'} {settedCurrency}
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
