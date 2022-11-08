import { StackScreenProps, StackNavigationProp } from '@react-navigation/stack';

import { valueOf } from '@@types/etc';

export type TRootStackParamList = {
  AUTH: undefined;
  SEED_PHRASE: {
    onlyCopy?: boolean;
  };
  SEED_PHRASE_CONFIRM: undefined;
  MAIN: undefined;
  SETTING_SECURITY: undefined;
  SETTING_PRIVACY_POLITY: undefined;
  SETTING_TERMS_OF_SERVICE: undefined;
  SETTING_DELETE_ACCOUNT: undefined;
  SETTING_DELETE_ACCOUNT_SUCCESS: undefined;
  SETTING_APP_VERSION: undefined;
  SETTING_PRIVATE_KEY: undefined;
  SETTING_FAQ: undefined;
};

export type RootStackRouteType = Record<keyof TRootStackParamList, keyof TRootStackParamList>;

export const ROOT_STACK_ROUTE: RootStackRouteType = {
  AUTH: 'AUTH',
  SEED_PHRASE: 'SEED_PHRASE',
  SEED_PHRASE_CONFIRM: 'SEED_PHRASE_CONFIRM',
  MAIN: 'MAIN',
  SETTING_SECURITY: 'SETTING_SECURITY',
  SETTING_PRIVACY_POLITY: 'SETTING_PRIVACY_POLITY',
  SETTING_TERMS_OF_SERVICE: 'SETTING_TERMS_OF_SERVICE',
  SETTING_DELETE_ACCOUNT: 'SETTING_DELETE_ACCOUNT',
  SETTING_DELETE_ACCOUNT_SUCCESS: 'SETTING_DELETE_ACCOUNT_SUCCESS',
  SETTING_APP_VERSION: 'SETTING_APP_VERSION',
  SETTING_PRIVATE_KEY: 'SETTING_PRIVATE_KEY',
  SETTING_FAQ: 'SETTING_FAQ',
} as const;

export type RouteName = valueOf<typeof ROOT_STACK_ROUTE>;

export type TRootStackNavigationProps<T extends RouteName> = StackNavigationProp<TRootStackParamList, T>;

export type TRootStackScreenProps<T extends keyof TRootStackParamList> = StackScreenProps<TRootStackParamList, T>;
