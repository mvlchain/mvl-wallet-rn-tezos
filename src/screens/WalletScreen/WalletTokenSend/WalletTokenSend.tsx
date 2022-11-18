import React, { useLayoutEffect, useState } from 'react';

import { useRoute, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { add } from 'react-native-reanimated';

import Divider from '@@components/BasicComponents/Divider';
import { DIVIDER_THICKNESS } from '@@components/BasicComponents/Divider/Divider.type';
import SendInputBoard from '@@components/WalletTokenSend/SendInputBoard';
import SpeedOperationBoard from '@@components/WalletTransactionSpeedUpCancel/SpeedOperationBoard';
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

  const [amount, setAmount] = useState('0');
  const [address, setAddress] = useState('');
  return (
    <View style={{ flex: 1 }}>
      <SendInputBoard amount={amount} setAmount={setAmount} address={address} setAddress={setAddress} />
      <Divider thickness={DIVIDER_THICKNESS.THICK} />
      <SpeedOperationBoard />
    </View>
  );
}

export default WalletTokenSend;
