import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { PageProps } from '@@assets/constants';
import useStore from '@@store/index';

import { Auth, CustomAuthImpl } from '../../domain/auth/auth';

const Wallet = createBottomTabNavigator();

function HomeScreen() {
  const { isAuthenticated, toggle } = useStore();
  // const auth: Auth = new TkeyAuthImpl();
  // const auth: Auth = new Web3AuthImpl();
  const auth: Auth = new CustomAuthImpl();

  const [key, setKey] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const login = async () => {
    try {
      const key = await auth.signIn();
      setKey(key);
    } catch (e) {
      console.error(e);
      setErrorMsg(String(e));
    }
  };

  return (
    <View style={styles.container}>
      <Text>{isAuthenticated ? 'Auth' : 'Unauth'}</Text>
      <Button title='Toggle Auth' onPress={() => toggle()} />
      <Text>Key: {key}</Text>
      <Text>Error: {errorMsg}</Text>
      <Button title='Login with Web3Auth' onPress={login} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

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
