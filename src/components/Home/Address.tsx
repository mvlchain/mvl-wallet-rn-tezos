import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { CopyIcon } from '@@assets/image';
import { fontSize, width, height } from '@@utils/ui';

function Address({ address }: { address: string }) {
  return (
    <View>
      <Text style={styles.label}>Address</Text>
      <View style={styles.addressContainer}>
        <Text style={styles.address}>{address}</Text>
        <CopyIcon width={width * 20} height={width * 20} style={styles.copyIcon} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: fontSize(16), color: '#808080' },
  addressContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: height * 4 },
  address: { fontSize: fontSize(18), color: '#000000', flexShrink: 1 },
  copyIcon: { marginLeft: width * 24 },
});

export default Address;
