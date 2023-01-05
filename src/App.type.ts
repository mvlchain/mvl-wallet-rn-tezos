import { StackScreenProps, StackNavigationProp } from '@react-navigation/stack';

import { valueOf } from '@@utils/types';

export type TAppStackParamList = {
  AUTH: undefined;
  SEED_PHRASE: {
    onlyCopy?: boolean;
  };
  SEED_PHRASE_CONFIRM: undefined;
  ROOT: undefined;
};

export type TAppStackRouteType = Record<keyof TAppStackParamList, keyof TAppStackParamList>;

export const APP_STACK_ROUTE: TAppStackRouteType = {
  AUTH: 'AUTH',
  SEED_PHRASE: 'SEED_PHRASE',
  SEED_PHRASE_CONFIRM: 'SEED_PHRASE_CONFIRM',
  ROOT: 'ROOT',
} as const;

export type RouteName = valueOf<typeof APP_STACK_ROUTE>;

export type TAppStackNavigationProps<T extends RouteName> = StackNavigationProp<TAppStackParamList, T>;

export type TAppStackScreenProps<T extends keyof TAppStackParamList> = StackScreenProps<TAppStackParamList, T>;
