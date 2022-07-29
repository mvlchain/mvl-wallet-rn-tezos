import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { PageProps } from '@@assets/constants';
import useStore from '@@store/index';

import IAuthService, { AUTH_PROVIDER, AuthProvider } from '../../domain/auth/auth.interface';
import { CustomAuthImpl } from '../../domain/auth/auth.service';

const Wallet = createBottomTabNavigator();

function HomeScreen() {
  const { isAuthenticated, toggle } = useStore();
  const auth: IAuthService = new CustomAuthImpl();

  const [key, setKey] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const login = async (provider: AuthProvider) => {
    try {
      const key = await auth.signIn(provider, () => Promise.resolve('1234'));
      setKey(key);
    } catch (e) {
      console.error(e);
      setErrorMsg(String(e));
    }
  };

  const logout = async () => {
    await auth.logout();
  };
  const test = async () => {
    await auth.test();
  };
  const deleteAccount = async () => {
    await auth.deleteAccount();
  };

  return (
    <View style={styles.container}>
      <Text>{isAuthenticated ? 'Auth' : 'Unauth'}</Text>
      <Button title='Toggle Auth' onPress={() => toggle()} />
      <Text>Key: {key}</Text>
      <Text>Error: {errorMsg}</Text>
      <Button title='Login with Web3Auth' onPress={() => login(AUTH_PROVIDER.GOOGLE)} />
      <Button title='Logout' onPress={() => logout()} />
      <Button title='Delete Account' onPress={() => deleteAccount()} />
      <Button title='Test' onPress={() => test()} />
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
