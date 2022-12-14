import React from 'react';

import { View } from 'react-native';

import Divider from '@@components/BasicComponents/Divider';
import { DIVIDER_THICKNESS } from '@@components/BasicComponents/Divider/Divider.type';
import PendingTransactionButtons from '@@components/WalletTransactionHistory/PendingTransactionButtons';
import TransactionDetailBoard from '@@components/WalletTransactionHistory/TransactionDetailBoard';
import TransactionFeeBoard from '@@components/WalletTransactionHistory/TransactionFeeBoard';
import TransactionHashBoard from '@@components/WalletTransactionHistory/TransactionHashBoard';

import * as S from './WalletTransactionHistory.style';

function WalletTransactionHistory() {
  return (
    <S.Container>
      <View>
        <TransactionHashBoard />
        <Divider thickness={DIVIDER_THICKNESS.THICK} />
        <TransactionDetailBoard />
        <Divider thickness={DIVIDER_THICKNESS.THICK} />
        <TransactionFeeBoard />
      </View>
      {/* <PendingTransactionButtons /> */}
    </S.Container>
  );
}

export default WalletTransactionHistory;
