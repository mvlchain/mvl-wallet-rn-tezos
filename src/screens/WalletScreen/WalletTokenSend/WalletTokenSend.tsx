import React, { useLayoutEffect, useState } from 'react';

import { useRoute, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { add } from 'react-native-reanimated';

import Divider from '@@components/BasicComponents/Divider';
import { DIVIDER_THICKNESS } from '@@components/BasicComponents/Divider/Divider.type';
import GasFeeBoard from '@@components/BasicComponents/GasFeeBoard';
import SendInputBoard from '@@components/WalletTokenSend/SendInputBoard';
import useHeader from '@@hooks/useHeader';

import { TTokenSendRootStackProps, TTokenSendRouteProps } from './WalletTokenSend.type';
import useTokenSend from './useTokenSend';

function WalletTokenSend() {
  const { params } = useRoute<TTokenSendRouteProps>();
  const { handleStackHeaderOption } = useHeader();
  const navigation = useNavigation<TTokenSendRootStackProps>();
  const { t } = useTranslation();

  useLayoutEffect(() => {
    const headerOption = handleStackHeaderOption({ title: t('send') });
    navigation.setOptions(headerOption);
  }, []);
  const { amount, setAmount, address, setAddress, confirmSend } = useTokenSend(params.tokenDto);
  return (
    <ScrollView style={{ flex: 1 }}>
      <SendInputBoard amount={amount} setAmount={setAmount} address={address} setAddress={setAddress} />
      <Divider thickness={DIVIDER_THICKNESS.THICK} />
      <GasFeeBoard isRevision={false} onConfirm={confirmSend} tokenDto={params.tokenDto} />
    </ScrollView>
  );
}

export default WalletTokenSend;
