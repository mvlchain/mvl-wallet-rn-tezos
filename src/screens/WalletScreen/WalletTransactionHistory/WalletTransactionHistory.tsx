import React, { useLayoutEffect } from 'react';

import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { Transaction } from 'bitcoinjs-lib';
import { Trans, useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import Divider from '@@components/BasicComponents/Divider';
import { DIVIDER_THICKNESS } from '@@components/BasicComponents/Divider/Divider.type';
import PendingTransactionButtons from '@@components/WalletTransactionHistory/PendingTransactionButtons';
import TransactionDetailBoard from '@@components/WalletTransactionHistory/TransactionDetailBoard';
import TransactionFeeBoard from '@@components/WalletTransactionHistory/TransactionFeeBoard';
import TransactionHashBoard from '@@components/WalletTransactionHistory/TransactionHashBoard';
import useHeader from '@@hooks/useHeader';

import * as S from './WalletTransactionHistory.style';
import { TTransactionHistoryRouteProps, TTransactionHistoryRootStackProps } from './WalletTransactionHistory.type';

function WalletTransactionHistory() {
  const { params } = useRoute<TTransactionHistoryRouteProps>();
  const { handleStackHeaderOption } = useHeader();
  const navigation = useNavigation<TTransactionHistoryRootStackProps>();
  const { t } = useTranslation();

  useLayoutEffect(() => {
    const headerOption = handleStackHeaderOption({ title: t('transaction_history') });
    navigation.setOptions(headerOption);
  }, []);

  return (
    <S.Container>
      <View>
        <TransactionHashBoard />
        <Divider thickness={DIVIDER_THICKNESS.THICK} />
        <TransactionDetailBoard />
        <Divider thickness={DIVIDER_THICKNESS.THICK} />
        <TransactionFeeBoard />
      </View>
      <PendingTransactionButtons />
    </S.Container>
  );
}

export default WalletTransactionHistory;
