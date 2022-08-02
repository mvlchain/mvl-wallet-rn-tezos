import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ChevronDownBlueIcon } from '@@assets/image';
import { useCurrentNetwork } from '@@hooks/useNetwork';
import { formatNetwork } from '@@utils/format';
import { fontSize, width, height } from '@@utils/ui';

function NetworkSelector() {
  const current = useCurrentNetwork();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{formatNetwork(current)}</Text>
      <ChevronDownBlueIcon width={width * 12} height={height * 6} style={styles.icon} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    paddingVertical: height * 4,
    paddingHorizontal: width * 12,
    backgroundColor: '#cce7fa',
    marginRight: 'auto',
    borderRadius: 100,
  },
  label: { color: '#0089e7', fontSize: fontSize(14), fontWeight: '500' },
  icon: { marginLeft: width * 11 },
});

export default NetworkSelector;
