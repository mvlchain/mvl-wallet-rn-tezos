import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as WebBrowser from '@toruslabs/react-native-web-browser';
import Web3Auth, { LOGIN_PROVIDER, OPENLOGIN_NETWORK } from '@web3auth/react-native-sdk';
import { ethers } from 'ethers';

import { PageProps } from '@@assets/constants';
import useStore from '@@store/index';

const Wallet = createBottomTabNavigator();

const scheme = 'clutchwallet'; // Or your desired app redirection scheme
const resolvedRedirectUrl = `${scheme}://***REMOVED***/redirect`;

function HomeScreen() {
  const { isAuthenticated, toggle } = useStore();

  const [key, setKey] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const login = async () => {
    try {
      const web3auth = new Web3Auth(WebBrowser, {
        clientId: 'BHtkl316SIVJuuFmmWlrHPb6MztS9JRcN_iKXmQuCnWZGGiYBGbSKd_ZfziAIidGarYorDACGSOBCJtF5ZMyrII',
        network: OPENLOGIN_NETWORK.TESTNET, // or other networks

        whiteLabel: {
          name: 'Clutch',
          defaultLanguage: 'en', // or other language
          dark: true, // or false,
          theme: {},
        },

        loginConfig: {
          google: {
            name: 'Clutch',
            verifier: '***REMOVED***',
            typeOfLogin: 'google',
            clientId: '***REMOVED***',
          },
        },
      });

      const state = await web3auth.login({
        loginProvider: LOGIN_PROVIDER.GOOGLE,
        redirectUrl: resolvedRedirectUrl,

        // extraLoginOptions: {
        //   domain: 'any_nonempty_string',
        //   verifierIdField: 'sub',
        //   id_token: 'JWT_TOKEN',
        // },
        dappShare:
          // eslint-disable-next-line max-len
          'coconut goddess giraffe feed river photo wife shrug hard nephew shoot lounge hundred trouble album veteran couple health decrease lecture six blame daughter spin',
      });

      setKey(state.privKey || 'no key');
      console.log(state);
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
      <Text>Linking URL: {resolvedRedirectUrl}</Text>
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
