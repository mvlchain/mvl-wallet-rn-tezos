// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';

import { View } from 'react-native';
import ErrorBoundary from 'react-native-error-boundary';

import ErrorScreenInRootStack from '@@components/BasicComponents/ErrorBoundary/ErrorScreenInRootStack';
import QRScan from '@@components/BasicComponents/QR/QRScan';

function WalletScanQR() {
  return (
    <ErrorBoundary FallbackComponent={ErrorScreenInRootStack}>
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <View style={{ flex: 1 }}>
        <QRScan />
      </View>
    </ErrorBoundary>
  );
}

export default WalletScanQR;
