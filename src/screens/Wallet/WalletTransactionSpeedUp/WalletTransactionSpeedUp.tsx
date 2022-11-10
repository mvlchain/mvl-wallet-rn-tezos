import React, { useLayoutEffect } from 'react';

import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import Devider from '@@components/BasicComponents/Devider';
import { DEVIDER_THICKNESS } from '@@components/BasicComponents/Devider/Devider.type';
import OldTransactionBoard from '@@components/WalletTransactionSpeedUpCancel/OldTransactionBoard';
import SpeedOperationBoard from '@@components/WalletTransactionSpeedUpCancel/SpeedOperationBoard';
import useHeader from '@@hooks/common/useHeader';

import { TSpeedUpRootStackProps, TSpeedUpRouteProps } from './WalletTransactionSpeedUp.type';

function WalletTransactionSpeedUp() {
  const { params } = useRoute<TSpeedUpRouteProps>();
  const { handleStackHeaderOption } = useHeader();
  const navigation = useNavigation<TSpeedUpRootStackProps>();
  const { t } = useTranslation();

  useLayoutEffect(() => {
    const headerOption = handleStackHeaderOption({ title: t('speedup') });
    navigation.setOptions(headerOption);
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <OldTransactionBoard />
      <Devider thickness={DEVIDER_THICKNESS.THICK} />
      <SpeedOperationBoard />
    </View>
  );
}

export default WalletTransactionSpeedUp;
