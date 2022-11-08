import React, { useLayoutEffect } from 'react';

import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { Transaction } from 'bitcoinjs-lib';
import { Trans, useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import Devider from '@@components/BasicComponents/Devider';
import { DEVIDER_THICKNESS } from '@@components/BasicComponents/Devider/Devider.type';
import TransactionDetailBoard from '@@components/WalletTransactionHistory/TransactionDetailBoard';
import TransactionFeeBoard from '@@components/WalletTransactionHistory/TransactionFeeBoard';
import TransactionHashBoard from '@@components/WalletTransactionHistory/TransactionHashBoard';
import useHeader from '@@hooks/common/useHeader';
import { TWalletStackNavigationProps, TWalletStackParamList } from '@@navigation/WalletStack/WalletStack.type';
function WalletTransactionHistory() {
  type WalletStackProps = TWalletStackNavigationProps<'WALLET_TRANSACTION_HISTORY'>;
  type TokenDetailRouteProps = RouteProp<TWalletStackParamList, 'WALLET_TRANSACTION_HISTORY'>;
  const { params } = useRoute<TokenDetailRouteProps>();
  const { handleStackHeaderOption } = useHeader();
  const navigation = useNavigation<WalletStackProps>();
  const { t } = useTranslation();

  useLayoutEffect(() => {
    const headerOption = handleStackHeaderOption({ title: t('transaction_history') });
    console.log(headerOption);
    navigation.setOptions(headerOption);
  }, []);

  return (
    <View>
      <TransactionHashBoard />
      <Devider thickness={DEVIDER_THICKNESS.THICK} />
      <TransactionDetailBoard />
      <Devider thickness={DEVIDER_THICKNESS.THICK} />
      <TransactionFeeBoard />
    </View>
  );
}

export default WalletTransactionHistory;
