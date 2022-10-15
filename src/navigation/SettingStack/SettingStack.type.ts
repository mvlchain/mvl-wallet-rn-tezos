import { NativeStackScreenProps, NativeStackNavigationProp } from '@react-navigation/native-stack';

import { valueOf } from '@@types/etc';

export type TSettingStackParamList = {
  SETTING_MAIN: undefined;
};

export type TSettingStackRouteType = Record<keyof TSettingStackParamList, keyof TSettingStackParamList>;

export const SETTING_STACK_ROUTE: TSettingStackRouteType = {
  SETTING_MAIN: 'SETTING_MAIN',
} as const;

export type RouteName = valueOf<typeof SETTING_STACK_ROUTE>;

export type TSettingStackNavigationProps<T extends RouteName> = NativeStackNavigationProp<TSettingStackParamList, T>;

export type TSettingStackScreenProps<T extends keyof TSettingStackParamList> = NativeStackScreenProps<TSettingStackParamList, T>;
