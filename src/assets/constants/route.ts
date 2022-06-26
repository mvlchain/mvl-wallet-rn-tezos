import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { valueOf } from '@@types/etc';

export const ROUTE_NAME = {
  LOGIN: 'LOGIN',
  WALLET: 'WALLET',
} as const;

export type RouteName = valueOf<typeof ROUTE_NAME>;

export type ParamList = {
  LOGIN: undefined;
  HOME: undefined;
};

export type PageProps<T extends RouteName> = NativeStackScreenProps<ParamList, T, 'MVL_WALLET'>;
