// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';

import { View } from 'react-native';

import Divider from '@@components/BasicComponents/Divider';
import { DIVIDER_THICKNESS } from '@@components/BasicComponents/Divider/Divider.type';
import GasFeeBoard from '@@components/BasicComponents/GasFeeBoard';
import OldTransactionBoard from '@@components/WalletTransactionSpeedUpCancel/OldTransactionBoard';

function WalletTransactionSpeedUp() {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{ flex: 1 }}>
      <OldTransactionBoard />
      <Divider thickness={DIVIDER_THICKNESS.THICK} />
      <GasFeeBoard onConfirm={() => {}} isRevision={true} />
    </View>
  );
}

export default WalletTransactionSpeedUp;
