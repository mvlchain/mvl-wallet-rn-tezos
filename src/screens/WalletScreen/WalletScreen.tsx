import React from 'react';

import { StyleSheet, View } from 'react-native';

import Account from '@@components/Wallet/Account';
import TokenList from '@@components/Wallet/TokenList';

import useWalletScreen from './useWalletScreen';

function WalletScreen() {
  useWalletScreen();

  return (
    <View style={styles.container}>
      <Account />
      <View style={styles.separate} />
      <TokenList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  separate: {
    borderBottomColor: '#E6E6E6',
    borderBottomWidth: 1,
  },
});

export default WalletScreen;
