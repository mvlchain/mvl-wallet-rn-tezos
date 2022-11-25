import React, { useLayoutEffect } from 'react';

import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import Divider from '@@components/BasicComponents/Divider';
import { DIVIDER_THICKNESS } from '@@components/BasicComponents/Divider/Divider.type';
import OldTransactionBoard from '@@components/WalletTransactionSpeedUpCancel/OldTransactionBoard';
import SpeedOperationBoard from '@@components/WalletTransactionSpeedUpCancel/SpeedOperationBoard';
import useHeader from '@@hooks/useHeader';

import { TSpeedUpRootStackProps, TSpeedUpRouteProps } from './WalletTransactionSpeedUp.type';

function WalletTransactionSpeedUp() {
  const { params } = useRoute<TSpeedUpRouteProps>();
  const { handleStackHeaderOption } = useHeader();
  const navigation = useNavigation<TSpeedUpRootStackProps>();
  const { t } = useTranslation();

  useLayoutEffect(() => {
    const headerOption = handleStackHeaderOption({ title: t('speed_up') });
    navigation.setOptions(headerOption);
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <OldTransactionBoard />
      <Divider thickness={DIVIDER_THICKNESS.THICK} />
      <SpeedOperationBoard />
    </View>
  );
}

export default WalletTransactionSpeedUp;
