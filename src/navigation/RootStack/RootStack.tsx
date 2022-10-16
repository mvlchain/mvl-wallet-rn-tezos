import React from 'react';

import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native';

import AuthStack from '@@navigation/AuthStack';
import MainTab from '@@navigation/MainTab';

import { ROOT_STACK_ROUTE, TRootStackParamList } from './RootStack.type';

const { Navigator, Screen } = createNativeStackNavigator<TRootStackParamList>();

type ScreenProps = Parameters<typeof Screen>[0];

const screens: Array<ScreenProps> = [
  {
    name: ROOT_STACK_ROUTE.AUTH,
    component: AuthStack,
    options: {
      headerShown: false,
    },
  },
  {
    name: ROOT_STACK_ROUTE.MAIN,
    component: MainTab,
    options: {
      headerShown: false,
    },
  },
];

const routerTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
  },
};

function RootStack() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer theme={routerTheme}>
        <Navigator initialRouteName={ROOT_STACK_ROUTE.AUTH}>
          {screens.map((props) => (
            <Screen key={props.name} {...props} />
          ))}
        </Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default RootStack;
