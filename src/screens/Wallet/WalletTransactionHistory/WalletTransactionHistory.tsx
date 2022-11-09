import React, { useLayoutEffect } from 'react';

import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { Transaction } from 'bitcoinjs-lib';
import { Trans, useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import Devider from '@@components/BasicComponents/Devider';
import { DEVIDER_THICKNESS } from '@@components/BasicComponents/Devider/Devider.type';
import PendingTransactionButtons from '@@components/WalletTransactionHistory/PendingTransactionButtons';
import TransactionDetailBoard from '@@components/WalletTransactionHistory/TransactionDetailBoard';
import TransactionFeeBoard from '@@components/WalletTransactionHistory/TransactionFeeBoard';
import TransactionHashBoard from '@@components/WalletTransactionHistory/TransactionHashBoard';
import useHeader from '@@hooks/common/useHeader';

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
        <Devider thickness={DEVIDER_THICKNESS.THICK} />
        <TransactionDetailBoard />
        <Devider thickness={DEVIDER_THICKNESS.THICK} />
        <TransactionFeeBoard />
      </View>
      <PendingTransactionButtons />
    </S.Container>
  );
}

export default WalletTransactionHistory;
