import React from 'react';

import { RefreshControl, View } from 'react-native';
import ErrorBoundary from 'react-native-error-boundary';

import Divider from '@@components/BasicComponents/Divider';
import { DIVIDER_THICKNESS } from '@@components/BasicComponents/Divider/Divider.type';
import ErrorScreenInRootStack from '@@components/BasicComponents/ErrorBoundary/ErrorScreenInRootStack';
import PendingTransactionButtons from '@@components/WalletTransactionHistory/PendingTransactionButtons';
import TransactionDetailBoard from '@@components/WalletTransactionHistory/TransactionDetailBoard';
import TransactionFeeBoard from '@@components/WalletTransactionHistory/TransactionFeeBoard';
import TransactionHashBoard from '@@components/WalletTransactionHistory/TransactionHashBoard';

import * as S from './WalletTransactionHistory.style';
import { useWalletTransactionHistory } from './useWalletTransactionHistory';

function WalletTransactionHistory() {
  // TODO: call getSingleHistory query when onRefresh
  const { price, fee, settedCurrency, type, valueSign, value, ticker, updatedAt, status, to, hash, refetch } = useWalletTransactionHistory();
  return (
    <ErrorBoundary FallbackComponent={ErrorScreenInRootStack}>
      <S.Container refreshControl={<RefreshControl refreshing={false} onRefresh={refetch} />}>
        <View>
          <TransactionHashBoard hash={hash} />
          <Divider thickness={DIVIDER_THICKNESS.THICK} />
          <TransactionDetailBoard
            type={type}
            value={value}
            valueSign={valueSign}
            ticker={ticker}
            price={price}
            settedCurrency={settedCurrency}
            updatedAt={updatedAt}
            to={to}
            status={status}
          />
          <Divider thickness={DIVIDER_THICKNESS.THICK} />
          <TransactionFeeBoard fee={fee} ticker={ticker} />
        </View>
        {/* <PendingTransactionButtons /> */}
      </S.Container>
    </ErrorBoundary>
  );
}

export default WalletTransactionHistory;
