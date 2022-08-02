import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import TempIcon from '@@components/TempIcon';
import { fontSize, width, height } from '@@utils/ui';

function TokenListItem({
  // icon,
  name,
  amount,
  amountUSD,
}: any) {
  return (
    <View key={name} style={styles.container}>
      <View style={styles.label}>
        <TempIcon size={width * 40} />
        {/* <Image source={{ uri: icon, width: width * 40, height: width * 40 }} /> */}
        <Text style={styles.name}>{name}</Text>
      </View>
      <View>
        <Text style={styles.amount}>
          {amount} {name}
        </Text>
        <Text style={amountUSD}>{amountUSD} USD</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: height * 16 },
  label: { flexDirection: 'row', alignItems: 'center' },
  name: { marginLeft: width * 18, fontSize: fontSize(16), color: '#000', fontWeight: '500' },
  amount: { fontSize: fontSize(16), color: '#000', fontWeight: '500' },
  amountUSD: { fontSize: fontSize(16), color: '#808080', fontWeight: '500' },
});

export default TokenListItem;
