import React, { useLayoutEffect } from 'react';

import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import Divider from '@@components/BasicComponents/Divider';
import { DIVIDER_THICKNESS } from '@@components/BasicComponents/Divider/Divider.type';
import OldTransactionBoard from '@@components/WalletTransactionSpeedUpCancel/OldTransactionBoard';
import SpeedOperationBoard from '@@components/WalletTransactionSpeedUpCancel/SpeedOperationBoard';
import useHeader from '@@hooks/common/useHeader';

import { TCancelRootStackProps, TCancelRouteProps } from './WalletTransactionCancel.type';

function WalletTransactionCancel() {
  const { params } = useRoute<TCancelRouteProps>();
  const { handleStackHeaderOption } = useHeader();
  const navigation = useNavigation<TCancelRootStackProps>();
  const { t } = useTranslation();

  useLayoutEffect(() => {
    const headerOption = handleStackHeaderOption({ title: t('cancel_trnascation') });
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

export default WalletTransactionCancel;
