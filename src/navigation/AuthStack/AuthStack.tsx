import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignInScreen from '@@screens/SignInScreen';

import { AUTH_STACK_ROUTE, TAuthStackParamList } from './AuthStack.type';

const { Navigator, Screen } = createNativeStackNavigator<TAuthStackParamList>();

type ScreenProps = Parameters<typeof Screen>[0];

const screens: Array<ScreenProps> = [
  {
    name: AUTH_STACK_ROUTE.SIGN_IN,
    component: SignInScreen,
  },
];

function AuthStack() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {screens.map((props) => (
        <Screen key={props.name} {...props} />
      ))}
    </Navigator>
  );
}

export default AuthStack;
