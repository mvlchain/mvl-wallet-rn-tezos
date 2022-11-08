import React from 'react';

import { View } from 'react-native';

import { TokenMVL32Icon } from '@@assets/image';
import { TextButton } from '@@components/BasicComponents/Buttons/TextButton';
import TokenDetailBoard from '@@components/WalletTokenDetail/TokenDetailBoard';
import TransactionHistoryList from '@@components/WalletTokenDetail/TransactionHistoryList';
import { width, height } from '@@utils/ui';

import * as S from './WalletTokenDetail.style';

function WalletTokenDetail() {
  const { symbol, balance, baseCurrencyBalance, baseCurrencySymbol } = {
    symbol: 'MVL',
    balance: 5000,
    baseCurrencyBalance: 1000000000,
    baseCurrencySymbol: 'USD',
  };

  return (
    <View>
      <TokenDetailBoard
        icon={<TokenMVL32Icon width={width * 40} height={height * 40} />}
        symbol={symbol}
        baseCurrencyBalance={baseCurrencyBalance}
        balance={balance}
        baseCurrencySymbol={baseCurrencySymbol}
      />
      <S.EmptyDeviderThick />
      <S.TransactionHistoryContainer>
        <S.TransactionHistoryLabelWrapper>
          <S.TransactionHistoryLabel>Transaction History</S.TransactionHistoryLabel>
          <TextButton label={'All'} onPress={() => {}} disabled={false} />
        </S.TransactionHistoryLabelWrapper>
        <TransactionHistoryList />
      </S.TransactionHistoryContainer>
    </View>
  );
}

export default WalletTokenDetail;
