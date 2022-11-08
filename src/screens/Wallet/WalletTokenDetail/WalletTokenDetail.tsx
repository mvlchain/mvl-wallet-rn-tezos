import React, { useLayoutEffect } from 'react';

import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { View } from 'react-native';

import Devider from '@@components/BasicComponents/Devider';
import { DEVIDER_THICKNESS } from '@@components/BasicComponents/Devider/Devider.type';
import TokenDetailBoard from '@@components/WalletTokenDetail/TokenDetailBoard';
import TransactionHistoryList from '@@components/WalletTokenDetail/TransactionHistoryList';
import useHeader from '@@hooks/common/useHeader';
import { TWalletStackNavigationProps, TWalletStackParamList } from '@@navigation/WalletStack/WalletStack.type';

function WalletTokenDetail() {
  type WalletStackProps = TWalletStackNavigationProps<'WALLET_TOKEN_DETAIL'>;
  type TokenDetailRouteProps = RouteProp<TWalletStackParamList, 'WALLET_TOKEN_DETAIL'>;
  const { params } = useRoute<TokenDetailRouteProps>();
  const { handleStackHeaderOption } = useHeader();
  const navigation = useNavigation<WalletStackProps>();

  useLayoutEffect(() => {
    const title = params.symbol;
    const headerOption = handleStackHeaderOption({ title });
    navigation.setOptions(headerOption);
  }, []);

  return (
    <View>
      <TokenDetailBoard />
      <Devider thickness={DEVIDER_THICKNESS.THICK} />
      <TransactionHistoryList />
    </View>
  );
}

export default WalletTokenDetail;
