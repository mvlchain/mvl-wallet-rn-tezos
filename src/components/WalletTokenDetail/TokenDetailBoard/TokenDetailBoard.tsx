import React from 'react';

import { View } from 'react-native';

import { PrimaryButton } from '@@components/BasicComponents/Buttons/BaseButton';
import { fontSize } from '@@utils/ui';

import * as S from './TokenDetailBoard.style';
import { ITokenDetailBoardProps } from './TokenDetailBoard.type';

function TokenDetailBoard({ icon, symbol, baseCurrencyBalance, balance, baseCurrencySymbol }: ITokenDetailBoardProps) {
  return (
    <View>
      <S.TokenInfoContainer>
        <S.TokenSymbolWrapper>
          {icon}
          <S.TokenName>{symbol}</S.TokenName>
        </S.TokenSymbolWrapper>
        <S.TokenAmountWrapper>
          <S.TokenAmount>{balance}</S.TokenAmount>
          <S.TokenBaseCurrency>
            {baseCurrencyBalance} {baseCurrencySymbol}
          </S.TokenBaseCurrency>
        </S.TokenAmountWrapper>
      </S.TokenInfoContainer>
      <S.ReceiveSendContainer>
        <PrimaryButton label='Receive' onPress={() => {}} size={'small'} wrapperStyle={{ flex: 1 }} textStyle={{ lineHeight: fontSize(14) }} />
        <S.Gap />
        <PrimaryButton label='Send' onPress={() => {}} size={'small'} wrapperStyle={{ flex: 1 }} textStyle={{ lineHeight: fontSize(14) }} />
      </S.ReceiveSendContainer>
    </View>
  );
}

export default TokenDetailBoard;
