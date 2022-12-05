import { NativeStackScreenProps, NativeStackNavigationProp } from '@react-navigation/native-stack';

import { valueOf } from '@@utils/types';

/**
 * Map of route name and parameters of components
 */
export type TEventStackParamList = {
  EVENT: undefined;
  DETAILS: undefined;
};

export type TEventStackRouteType = Record<keyof TEventStackParamList, keyof TEventStackParamList>;

export const EVENT_STACK_ROUTE: TEventStackRouteType = {
  EVENT: 'EVENT',
  DETAILS: 'DETAILS',
} as const;

export type RouteName = valueOf<typeof EVENT_STACK_ROUTE>;

export type TEventStackNavigationProps<T extends RouteName> = NativeStackNavigationProp<TEventStackParamList, T>;

export type TEventStackScreenProps<T extends keyof TEventStackParamList> = NativeStackScreenProps<TEventStackParamList, T>;
