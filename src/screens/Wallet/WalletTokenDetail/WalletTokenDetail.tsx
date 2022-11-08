import React from 'react';

import { View } from 'react-native';

import TokenDetailBoard from '@@components/WalletTokenDetail/TokenDetailBoard';
import TransactionHistoryList from '@@components/WalletTokenDetail/TransactionHistoryList';

import * as S from './WalletTokenDetail.style';

function WalletTokenDetail() {
  return (
    <View>
      <TokenDetailBoard />
      <S.EmptyDeviderThick />
      <TransactionHistoryList />
    </View>
  );
}

export default WalletTokenDetail;
