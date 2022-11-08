import React from 'react';

import { StyleSheet, Text, View } from 'react-native';

import { useTokenBalanceList } from '@@hooks/useTokenBalanceList';
import { fontSize, width } from '@@utils/ui';

import TokenListItem from './TokenListItem';

function TokenList() {
  const tokenList = useTokenBalanceList();

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Token</Text>
      </View>
      <View>
        {tokenList.map((props, i) => (
          <TokenListItem {...props} key={'token' + i} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: width * 24 },
  titleContainer: { paddingVertical: width * 24 },
  title: { fontSize: fontSize(20), color: '#000', fontWeight: '800' },
});

export default TokenList;
