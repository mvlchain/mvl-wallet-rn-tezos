import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignInScreen from '@@screens/SignInScreen';

import { AUTH_STACK_ROUTE, TAuthStackParamList } from './AuthStack.type';

const { Navigator, Screen } = createNativeStackNavigator<TAuthStackParamList>();

function AuthStack() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen key={AUTH_STACK_ROUTE.SIGN_IN} name={AUTH_STACK_ROUTE.SIGN_IN} component={SignInScreen} />
    </Navigator>
  );
}

export default AuthStack;
