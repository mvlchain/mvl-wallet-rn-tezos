import { NativeStackScreenProps, NativeStackNavigationProp } from '@react-navigation/native-stack';

import { valueOf } from '@@types/etc';

export type TRootStackParamList = {
  AUTH: undefined;
  MAIN: undefined;
  SETTING_SECURITY: undefined;
  SETTING_PRIVACY_POLITY: undefined;
  SETTING_TERMS_OF_SERVICE: undefined;
  SETTING_DELETE_ACCOUNT: undefined;
  SETTING_APP_VERSION: undefined;
  SETTING_PRIVATE_KEY: undefined;
  SETTING_FAQ: undefined;
};

export type RootStackRouteType = Record<keyof TRootStackParamList, keyof TRootStackParamList>;

export const ROOT_STACK_ROUTE: RootStackRouteType = {
  AUTH: 'AUTH',
  MAIN: 'MAIN',
  SETTING_SECURITY: 'SETTING_SECURITY',
  SETTING_PRIVACY_POLITY: 'SETTING_PRIVACY_POLITY',
  SETTING_TERMS_OF_SERVICE: 'SETTING_TERMS_OF_SERVICE',
  SETTING_DELETE_ACCOUNT: 'SETTING_DELETE_ACCOUNT',
  SETTING_APP_VERSION: 'SETTING_APP_VERSION',
  SETTING_PRIVATE_KEY: 'SETTING_PRIVATE_KEY',
  SETTING_FAQ: 'SETTING_FAQ',
} as const;

export type RouteName = valueOf<typeof ROOT_STACK_ROUTE>;

export type TRootStackNavigationProps<T extends RouteName> = NativeStackNavigationProp<TRootStackParamList, T>;

export type TRootStackScreenProps<T extends keyof TRootStackParamList> = NativeStackScreenProps<TRootStackParamList, T>;
