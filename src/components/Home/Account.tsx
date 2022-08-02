import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Button } from 'react-native-paper';

import { MoreIcon, WhiteQrIcon, WhiteScanIcon } from '@@assets/image';
import { useCurrentAccount } from '@@hooks/useAccount';
import { fontSize, width, height } from '@@utils/ui';

import Address from './Address';
import NetworkSelector from './NetworkSelector';
import WalletSelector from './WalletSelector';

const QrIcon = () => <WhiteQrIcon width={width * 20} height={height * 20} />;
const ScanIcon = () => <WhiteScanIcon width={width * 20} height={height * 20} />;

function Account() {
  const {
    // iconUrl,
    address,
  } = useCurrentAccount();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Avatar.Text size={width * 36} label='EX' />
        {/* <Image source={{ uri: iconUrl, width: width * 36, height: width * 36 }} /> */}
        <MoreIcon width={width * 24} height={width * 24} />
      </View>
      <View style={styles.section}>
        <WalletSelector />
        <NetworkSelector />
      </View>
      <View style={styles.section}>
        <Address address={address} />
      </View>
      <View style={styles.buttonContainer}>
        <Button mode='contained' style={styles.button} icon={QrIcon}>
          <Text style={{ fontSize: fontSize(14) }}>Receive</Text>
        </Button>
        <Button mode='contained' style={styles.button} icon={ScanIcon}>
          <Text style={{ fontSize: fontSize(14) }}>Send</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: width * 24 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  section: { marginTop: height * 16 },
  buttonContainer: { flexDirection: 'row', marginTop: height * 16, marginHorizontal: width * -4 },
  button: { flex: 1, marginHorizontal: width * 4 },
});

export default Account;
