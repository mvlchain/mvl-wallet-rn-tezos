import { StackScreenProps, StackNavigationProp } from '@react-navigation/stack';

import { valueOf } from '@@utils/types';

export type TWalletStackParamList = {
  WALLET: undefined;
  WALLET_TOKEN_RECEIVE: undefined;
  WALLET_TOKEN_RECEIVE_SELECT: undefined;
};

export type TWalletStackRouteType = Record<keyof TWalletStackParamList, keyof TWalletStackParamList>;

export const WALLET_STACK_ROUTE: TWalletStackRouteType = {
  WALLET: 'WALLET',
  WALLET_TOKEN_RECEIVE: 'WALLET_TOKEN_RECEIVE',
  WALLET_TOKEN_RECEIVE_SELECT: 'WALLET_TOKEN_RECEIVE_SELECT',
} as const;

export type RouteName = valueOf<typeof WALLET_STACK_ROUTE>;

export type TWalletStackNavigationProps<T extends RouteName> = StackNavigationProp<TWalletStackParamList, T>;

export type TWalletStackScreenProps<T extends keyof TWalletStackParamList> = StackScreenProps<TWalletStackParamList, T>;
