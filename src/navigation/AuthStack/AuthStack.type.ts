import { NativeStackScreenProps, NativeStackNavigationProp } from '@react-navigation/native-stack';

import { valueOf } from '@@types/etc';

export type TAuthStackParamList = {
  SIGN_IN: undefined;
};

export type TAuthStackRouteType = Record<keyof TAuthStackParamList, keyof TAuthStackParamList>;

export const AUTH_STACK_ROUTE: TAuthStackRouteType = {
  SIGN_IN: 'SIGN_IN',
} as const;

export type RouteName = valueOf<typeof AUTH_STACK_ROUTE>;

export type TAuthStackNavigationProps<T extends RouteName> = NativeStackNavigationProp<TAuthStackParamList, T>;

export type TAuthStackScreenProps<T extends keyof TAuthStackParamList> = NativeStackScreenProps<TAuthStackParamList, T>;
