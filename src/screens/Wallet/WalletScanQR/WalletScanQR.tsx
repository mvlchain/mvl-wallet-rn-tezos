import React, { useLayoutEffect } from 'react';

import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import QRScan from '@@components/QR/QRScan';
import useHeader from '@@hooks/common/useHeader';

function WalletScanQR() {
  const { t } = useTranslation();
  const { handleStackHeaderOption } = useHeader();
  //TODO: 타입
  const navigation = useNavigation<any>();

  useLayoutEffect(() => {
    const headerOption = handleStackHeaderOption({ title: t('scan_qr_code') });
    navigation.setOptions(headerOption);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <QRScan />
    </View>
  );
}

export default WalletScanQR;
