import React, { useLayoutEffect } from 'react';

import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

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
    navigation.setOptions(headerOption);
  }, []);
  return (
    <View>
      <Text>Wallet Transaction History</Text>
    </View>
  );
}

export default WalletTransactionHistory;
