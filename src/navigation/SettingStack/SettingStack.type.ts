import { NativeStackScreenProps, NativeStackNavigationProp } from '@react-navigation/native-stack';

import { valueOf } from '@@types/etc';

export type TSettingStackParamList = {
  SETTING_MAIN: undefined;
  SETTING_SECURITY: undefined;
  SETTING_PRIVACY_POLITY: undefined;
  SETTING_TERMS_OF_SERVICE: undefined;
  SETTING_DELETE_ACCOUNT: undefined;
  SETTING_APP_VERSION: undefined;
  SETTING_PRIVATE_KEY: undefined;
  SETTING_FAQ: undefined;
};

export type TSettingStackRouteType = Record<keyof TSettingStackParamList, keyof TSettingStackParamList>;

export const SETTING_STACK_ROUTE: TSettingStackRouteType = {
  SETTING_MAIN: 'SETTING_MAIN',
  SETTING_SECURITY: 'SETTING_SECURITY',
  SETTING_PRIVACY_POLITY: 'SETTING_PRIVACY_POLITY',
  SETTING_TERMS_OF_SERVICE: 'SETTING_TERMS_OF_SERVICE',
  SETTING_DELETE_ACCOUNT: 'SETTING_DELETE_ACCOUNT',
  SETTING_APP_VERSION: 'SETTING_APP_VERSION',
  SETTING_PRIVATE_KEY: 'SETTING_PRIVATE_KEY',
  SETTING_FAQ: 'SETTING_FAQ',
} as const;

export type RouteName = valueOf<typeof SETTING_STACK_ROUTE>;

export type TSettingStackNavigationProps<T extends RouteName> = NativeStackNavigationProp<TSettingStackParamList, T>;

export type TSettingStackScreenProps<T extends keyof TSettingStackParamList> = NativeStackScreenProps<TSettingStackParamList, T>;
