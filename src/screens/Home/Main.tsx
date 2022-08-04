import React from 'react';

import { StyleSheet, View } from 'react-native';

import Account from '@@components/Home/Account';
import TokenList from '@@components/Home/TokenList';

function HomeMain() {
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

export default HomeMain;
