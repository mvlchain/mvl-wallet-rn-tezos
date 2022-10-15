import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SettingMain from '@@screens/Setting';

import { SETTING_STACK_ROUTE, TSettingStackParamList } from './SettingStack.type';

const { Navigator, Screen } = createNativeStackNavigator<TSettingStackParamList>();

type ScreenProps = Parameters<typeof Screen>[0];

const screens: Array<ScreenProps> = [
  {
    name: SETTING_STACK_ROUTE.SETTING_MAIN,
    component: SettingMain,
  },
];

function SettingStack() {
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

export default SettingStack;
