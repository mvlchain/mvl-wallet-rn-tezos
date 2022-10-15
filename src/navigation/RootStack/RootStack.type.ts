import { NativeStackScreenProps, NativeStackNavigationProp } from '@react-navigation/native-stack';

import { valueOf } from '@@types/etc';

export type TRootStackParamList = {
  AUTH: undefined;
  MAIN: undefined;
};

export type RootStackRouteType = Record<keyof TRootStackParamList, keyof TRootStackParamList>;

export const ROOT_STACK_ROUTE: RootStackRouteType = {
  AUTH: 'AUTH',
  MAIN: 'MAIN',
} as const;

export type RouteName = valueOf<typeof ROOT_STACK_ROUTE>;

export type RootStackNavigationProps<T extends RouteName> = NativeStackNavigationProp<TRootStackParamList, T>;

export type RootStackScreenProps<T extends keyof TRootStackParamList> = NativeStackScreenProps<TRootStackParamList, T>;
