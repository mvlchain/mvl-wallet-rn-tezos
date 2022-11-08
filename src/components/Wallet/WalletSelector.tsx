import React from 'react';

import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { ChevronDownBlackIcon } from '@@assets/image';
import { useCurrentAccount } from '@@hooks/useAccount';
// import { useBottomSheetStore } from '@@store/index';
import { fontSize, width, height } from '@@utils/ui';

function WalletSelector() {
  const { name } = useCurrentAccount();

  // const { handler } = useBottomSheetStore();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        // handler?.expand();
      }}
    >
      <Text style={styles.label}>{name}</Text>
      <ChevronDownBlackIcon width={width * 12} height={height * 8} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center' },
  label: { fontSize: fontSize(28), color: '#000', fontWeight: 'bold', marginRight: width * 8 },
});

export default WalletSelector;
