import React from 'react';
import { Button, SafeAreaView, Text } from 'react-native';

import { ROUTE_NAME, type PageProps } from '@@assets/constants';

function Login({ navigation }: PageProps<'LOGIN'>) {
  return (
    <SafeAreaView>
      <Text>Login</Text>

      <Button title='Go Home' onPress={() => navigation.navigate(ROUTE_NAME.WALLET)} />
    </SafeAreaView>
  );
}

export default Login;
