import React, { useEffect } from 'react';

import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { BigNumber } from 'ethers';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import * as TokenIcon from '@@assets/image/token';
import { PrimaryButton } from '@@components/BasicComponents/Buttons/BaseButton';
import { WALLET_TOKEN } from '@@constants/token.constant';
import { PRICE_NAME } from '@@constants/wallet.constant';
import useOneTokenBalance from '@@hooks/useOneTokenBalance';
import useOneTokenPrice from '@@hooks/useOneTokenPrice';
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
  const { balance } = useOneTokenBalance(params.symbol);
  const { price } = useOneTokenPrice(params.symbol, BigNumber.from(1));
  const TokenImage = TokenIcon[params.symbol as keyof typeof TokenIcon];

  const gotoSend = () => {
    navigation.navigate(ROOT_STACK_ROUTE.WALLET_TOKEN_SEND, params);
  };

  return (
    <View>
      <S.TokenInfoContainer>
        <S.TokenSymbolWrapper>
          <TokenImage width={width * 32} height={height * 32} />
          <S.TokenName>{params.symbol}</S.TokenName>
        </S.TokenSymbolWrapper>
        <S.TokenAmountWrapper>
          <S.TokenAmount>{balance}</S.TokenAmount>
          <S.TokenBaseCurrency>
            {'-'} {settedCurrency}
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
