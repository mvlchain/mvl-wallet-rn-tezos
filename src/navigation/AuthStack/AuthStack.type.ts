import { StackScreenProps, StackNavigationProp } from '@react-navigation/stack';

import { valueOf } from '@@utils/types';

export type TAuthStackParamList = {
  SIGN_IN: undefined;
  SEED_PHRASE: {
    onlyCopy?: boolean;
  };
  SEED_PHRASE_CONFIRM: undefined;
};

export type TAuthStackRouteType = Record<keyof TAuthStackParamList, keyof TAuthStackParamList>;

export const AUTH_STACK_ROUTE: TAuthStackRouteType = {
  SIGN_IN: 'SIGN_IN',
  SEED_PHRASE: 'SEED_PHRASE',
  SEED_PHRASE_CONFIRM: 'SEED_PHRASE_CONFIRM',
} as const;

export type RouteName = valueOf<typeof AUTH_STACK_ROUTE>;

export type TAuthStackNavigationProps<T extends RouteName> = StackNavigationProp<TAuthStackParamList, T>;

export type TAuthStackScreenProps<T extends keyof TAuthStackParamList> = StackScreenProps<TAuthStackParamList, T>;
