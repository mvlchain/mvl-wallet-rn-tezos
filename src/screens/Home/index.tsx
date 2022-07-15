import React, { useState } from 'react';
import { Button, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as WebBrowser from '@toruslabs/react-native-web-browser';
import Web3Auth, { LOGIN_PROVIDER, OPENLOGIN_NETWORK } from '@web3auth/react-native-sdk';
import { Colors, DebugInstructions, Header, LearnMoreLinks, ReloadInstructions } from 'react-native/Libraries/NewAppScreen';

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
        clientId: '354250895959-eed00inuv99rtdhk0unktor6jaale1vu.apps.googleusercontent.com',
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
            verifier: 'clutch-google-testnet',
            typeOfLogin: 'google',
            clientId: '354250895959-eed00inuv99rtdhk0unktor6jaale1vu.apps.googleusercontent.com',
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
      });

      setKey(state.privKey || 'no key');
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
      <Text>Linking URL: {resolvedRedirectUrl}</Text>
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
