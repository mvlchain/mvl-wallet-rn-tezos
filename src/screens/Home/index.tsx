import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ethers } from 'ethers';

import { PageProps } from '@@assets/constants';
import useStore from '@@store/index';

import { Auth, CustomAuthImpl, TkeyAuthImpl, Web3AuthImpl } from '../../domain/auth/auth';

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

  const [text, onChangeText] = useState('');
  // eslint-disable-next-line max-len
  // decrease simple approve artist merit voice vivid strategy quantum income problem giant brave uncle hockey crush loyal replace marble catalog trash wave field reveal

  const [mnemonic, setMnemonic] = useState('');

  const transformMnemonic = () => {
    const mne = ethers.utils.entropyToMnemonic(text);
    console.log(`mnemonic: ${mne}`);
    setMnemonic(mne);
  };

  return (
    <View style={styles.container}>
      <Text>{isAuthenticated ? 'Auth' : 'Unauth'}</Text>
      <Button title='Toggle Auth' onPress={() => toggle()} />
      <Text>Key: {key}</Text>
      <Text>Error: {errorMsg}</Text>
      <Button title='Login with Web3Auth' onPress={login} />

      <TextInput onChangeText={onChangeText} value={text} />
      <Button title='to Mnemonic' onPress={transformMnemonic} />
      <TextInput value={mnemonic} />
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
