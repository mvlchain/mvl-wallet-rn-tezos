import { BottomTabScreenProps, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import { valueOf } from '@@types/etc';

export type TMainTabParamList = {
  WALLET: undefined;
  BROWSER: undefined;
  SETTING: undefined;
  TRADE: undefined;
};

export type MainTabRouteType = Record<keyof TMainTabParamList, keyof TMainTabParamList>;

export const MAIN_TAB_ROUTE: MainTabRouteType = {
  WALLET: 'WALLET',
  BROWSER: 'BROWSER',
  TRADE: 'TRADE',
  SETTING: 'SETTING',
} as const;

export type RouteName = valueOf<typeof MAIN_TAB_ROUTE>;

export type MainTabNavigationProps<T extends RouteName> = BottomTabNavigationProp<TMainTabParamList, T>;

export type MainTabScreenProps<T extends RouteName> = BottomTabScreenProps<TMainTabParamList, T>;