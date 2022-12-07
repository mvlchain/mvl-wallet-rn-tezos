// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';

import { View } from 'react-native';

import QRScan from '@@components/BasicComponents/QR/QRScan';

function WalletScanQR() {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{ flex: 1 }}>
      <QRScan />
    </View>
  );
}

export default WalletScanQR;
