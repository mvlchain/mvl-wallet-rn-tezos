import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SettingAppVersion from '@@screens/Setting/SettingAppVersion';
import SettingDeleteAccount from '@@screens/Setting/SettingDeleteAccount';
import SettingMain from '@@screens/Setting/SettingMain';
import SettingPrivacyPolicy from '@@screens/Setting/SettingPrivacyPolicy';
import SettingSecurity from '@@screens/Setting/SettingSecurity';
import SettingTermsOfService from '@@screens/Setting/SettingTermsOfService';

import { SETTING_STACK_ROUTE, TSettingStackParamList } from './SettingStack.type';

const { Navigator, Screen } = createNativeStackNavigator<TSettingStackParamList>();

type ScreenProps = Parameters<typeof Screen>[0];

const screens: Array<ScreenProps> = [
  {
    name: SETTING_STACK_ROUTE.SETTING_MAIN,
    component: SettingMain,
  },
  {
    name: SETTING_STACK_ROUTE.SETTING_PRIVACY_POLITY,
    component: SettingPrivacyPolicy,
  },
  {
    name: SETTING_STACK_ROUTE.SETTING_SECURITY,
    component: SettingSecurity,
  },
  {
    name: SETTING_STACK_ROUTE.SETTING_TERMS_OF_SERVICE,
    component: SettingTermsOfService,
  },
  {
    name: SETTING_STACK_ROUTE.SETTING_DELETE_ACCOUNT,
    component: SettingDeleteAccount,
  },
  {
    name: SETTING_STACK_ROUTE.SETTING_APP_VERSION,
    component: SettingAppVersion,
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
