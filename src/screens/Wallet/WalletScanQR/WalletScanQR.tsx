import React, { useLayoutEffect } from 'react';

import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';

import QRScan from '@@components/QR/QRScan';
import useHeader from '@@hooks/common/useHeader';

function WalletScanQR() {
  const { handleStackHeaderOption } = useHeader();
  //TODO: 타입
  const navigation = useNavigation<any>();

  useLayoutEffect(() => {
    const headerOption = handleStackHeaderOption({ title: 'Scan QR Code' });
    navigation.setOptions(headerOption);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <QRScan />
    </View>
  );
}

export default WalletScanQR;
