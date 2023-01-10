import React from 'react';

import { useRoute, useNavigation } from '@react-navigation/native';
import BigNumber from 'bignumber.js';
import { commify } from 'ethers/lib/utils';
import { useTranslation } from 'react-i18next';
import { View, Platform } from 'react-native';
import { SvgUri } from 'react-native-svg';

import { PrimaryButton } from '@@components/BasicComponents/Buttons/BaseButton';
import useOneTokenBalance from '@@hooks/useOneTokenBalance';
import useOneTokenPrice from '@@hooks/useOneTokenPrice';
import { ROOT_STACK_ROUTE } from '@@navigation/RootStack/RootStack.type';
import { TTokenDetailRouteProps } from '@@screens/WalletScreen/WalletTokenDetail/WalletTokenDetail.type';
import { TTokenReceiveRootStackProps } from '@@screens/WalletScreen/WalletTokenReceive/WalletTokenRecieve.type';
import { TTokenSendRootStackProps } from '@@screens/WalletScreen/WalletTokenSend/WalletTokenSend.type';
import settingPersistStore from '@@store/setting/settingPersistStore';
import { fontSize, width } from '@@utils/ui';

import * as S from './TokenDetailBoard.style';

function TokenDetailBoard() {
  const { t } = useTranslation();
  const { settedCurrency } = settingPersistStore();
  const { params } = useRoute<TTokenDetailRouteProps>();
  const navigation = useNavigation<TTokenSendRootStackProps | TTokenReceiveRootStackProps>();
  const { balance } = useOneTokenBalance(params.tokenDto);
  const { price } = useOneTokenPrice(params.tokenDto, balance);
  const gotoSend = () => {
    navigation.navigate(ROOT_STACK_ROUTE.WALLET_TOKEN_SEND, params);
  };
  const gotoReceive = () => {
    navigation.navigate(ROOT_STACK_ROUTE.WALLET_TOKEN_RECEIVE, params);
  };

  return (
    <View>
      <S.TokenInfoContainer>
        <S.TokenSymbolWrapper>
          {params.tokenDto.logoURI && <SvgUri uri={params.tokenDto.logoURI} width={`${width * 32}`} height={`${width * 32}`} />}
          <S.TokenName>{params.tokenDto.symbol}</S.TokenName>
        </S.TokenSymbolWrapper>
        <S.TokenAmountWrapper>
          <S.TokenAmount>{balance !== '-' ? commify(balance) : 0}</S.TokenAmount>
          <S.TokenBaseCurrency>
            {price !== '-' ? commify(new BigNumber(price).toString(10)) : 0} {settedCurrency}
            {/* {price} {settedCurrency} */}
          </S.TokenBaseCurrency>
        </S.TokenAmountWrapper>
      </S.TokenInfoContainer>
      <S.ReceiveSendContainer>
        <PrimaryButton
          label={t('receive')}
          onPress={gotoReceive}
          size={'small'}
          wrapperStyle={{ flex: 1 }}
          textStyle={Platform.OS === 'ios' && { lineHeight: fontSize(15) }}
        />
        <S.Gap />
        <PrimaryButton
          label={t('send')}
          onPress={gotoSend}
          size={'small'}
          wrapperStyle={{ flex: 1 }}
          textStyle={Platform.OS === 'ios' && { lineHeight: fontSize(15) }}
        />
      </S.ReceiveSendContainer>
    </View>
  );
}

export default TokenDetailBoard;
