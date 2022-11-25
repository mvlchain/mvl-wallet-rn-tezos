import React, { useLayoutEffect } from 'react';

import { useRoute, useNavigation } from '@react-navigation/native';
import { View } from 'react-native';

import Divider from '@@components/BasicComponents/Divider';
import { DIVIDER_THICKNESS } from '@@components/BasicComponents/Divider/Divider.type';
import TokenDetailBoard from '@@components/WalletTokenDetail/TokenDetailBoard';
import TransactionHistoryList from '@@components/WalletTokenDetail/TransactionHistoryList';
import useHeader from '@@hooks/useHeader';

import { TTokenDetailRouteProps, TTokenDetailRootStackProps } from './WalletTokenDetail.type';

function WalletTokenDetail() {
  const { params } = useRoute<TTokenDetailRouteProps>();
  const { handleStackHeaderOption } = useHeader();
  const navigation = useNavigation<TTokenDetailRootStackProps>();

  useLayoutEffect(() => {
    const title = params.symbol;
    const headerOption = handleStackHeaderOption({ title });
    navigation.setOptions(headerOption);
  }, []);

  return (
    <View>
      <TokenDetailBoard />
      <Divider thickness={DIVIDER_THICKNESS.THICK} />
      <TransactionHistoryList />
    </View>
  );
}

export default WalletTokenDetail;
