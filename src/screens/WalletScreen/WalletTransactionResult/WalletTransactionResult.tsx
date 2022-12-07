import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { Text, View, Button } from 'react-native';

import { ROOT_STACK_ROUTE, TRootStackNavigationProps } from '@@navigation/RootStack/RootStack.type';

function WalletTokenSend() {
  type rootStackProps = TRootStackNavigationProps<'MAIN'>;
  const navigation = useNavigation<rootStackProps>();
  const gohome = () => {
    navigation.navigate(ROOT_STACK_ROUTE.MAIN);
  };
  return (
    <View>
      <Text>Wallet Transaction Result</Text>
      <Button title={'go home'} onPress={gohome} />
    </View>
  );
}

export default WalletTokenSend;
