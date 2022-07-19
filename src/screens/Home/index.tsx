import React from 'react';
import { Button, SafeAreaView, Text, View } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { PageProps } from '@@assets/constants';
import useStore from '@@store/index';

const Wallet = createBottomTabNavigator();

function HomeScreen() {
  const { isAuthenticated, toggle } = useStore();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{isAuthenticated ? 'Auth' : 'Unauth'}</Text>
      <Button title='Toggle Auth' onPress={() => toggle()} />
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

function Home({ navigation }: PageProps<'WALLET'>) {
  return (
    <Wallet.Navigator>
      <Wallet.Screen name='Home' component={HomeScreen} />
      <Wallet.Screen name='Settings' component={SettingsScreen} />
    </Wallet.Navigator>
  );
}

export default Home;
