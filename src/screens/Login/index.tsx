import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import IAuthService, { AUTH_PROVIDER } from '@@domain/auth/auth.interface';
import { CustomAuthImpl } from '@@domain/auth/auth.service';
import useStore from '@@store/index';

function Login({ login }: { login: () => void }) {
  const auth: IAuthService = new CustomAuthImpl();

  const { isAuthenticated, toggle } = useStore();
  const [key, setKey] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const signIn = async () => {
    try {
      const key = await auth.signIn(AUTH_PROVIDER.GOOGLE, () => Promise.resolve('000000'));
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
      <Button title='Login with Web3Auth' onPress={signIn} />
      <Button title='Go to Main' onPress={login} />
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

export default Login;
