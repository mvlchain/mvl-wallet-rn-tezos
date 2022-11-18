import React, { useLayoutEffect } from 'react';

import { useRoute, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import useHeader from '@@hooks/common/useHeader';

import { TTokenSendRootStackProps, TTokenSendRouteProps } from './WalletTokenSend.type';

function WalletTokenSend() {
  const { params } = useRoute<TTokenSendRouteProps>();
  const { handleStackHeaderOption } = useHeader();
  const navigation = useNavigation<TTokenSendRootStackProps>();
  const { t } = useTranslation();

  useLayoutEffect(() => {
    const headerOption = handleStackHeaderOption({ title: t('send') });
    navigation.setOptions(headerOption);
  }, []);
  return (
    <View>
      <Text>Wallet Token Send</Text>
    </View>
  );
}

export default WalletTokenSend;
