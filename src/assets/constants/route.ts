import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { valueOf } from '@@types/etc';

export const ROUTE_NAME = {
  HOME: 'HOME',
  BROWSER: 'BROWSER',
  TRADE: 'TRADE',
  SETTING: 'SETTING',
} as const;

export type RouteName = valueOf<typeof ROUTE_NAME>;

export type ParamList = Record<RouteName, undefined> & {
  // [route name]: custom param
};

export type PageProps<T extends RouteName> = NativeStackScreenProps<ParamList, T, 'MVL_WALLET'>;
