import { NativeStackScreenProps, NativeStackNavigationProp } from '@react-navigation/native-stack';

import { valueOf } from '@@types/etc';

export type TWalletStackParamList = {
  WALLET: undefined;
  WALLET_EDIT_TOKEN_LIST: undefined;
  WALLET_TOKEN_DETAIL: undefined;
  WALLET_TOKEN_RECEIVE: undefined;
  WALLET_TOKEN_RECEIVE_SELECT: undefined;
  WALLET_TOKEN_SEND: undefined;
  WALLET_SCAN_QR: undefined;
  WALLET_TRANSACTION_RESULT: undefined;
  WALLET_TRANSACTION_HISTORY: undefined;
  WALLET_TRANSACTION_SPEED_UP: undefined;
  WALLET_TRANSACTION_CANCEL: undefined;
};

export type TWalletStackRouteType = Record<keyof TWalletStackParamList, keyof TWalletStackParamList>;

export const WALLET_STACK_ROUTE: TWalletStackRouteType = {
  WALLET: 'WALLET',
  WALLET_EDIT_TOKEN_LIST: 'WALLET_EDIT_TOKEN_LIST',
  WALLET_TOKEN_DETAIL: 'WALLET_TOKEN_DETAIL',
  WALLET_TOKEN_RECEIVE: 'WALLET_TOKEN_RECEIVE',
  WALLET_TOKEN_RECEIVE_SELECT: 'WALLET_TOKEN_RECEIVE_SELECT',
  WALLET_TOKEN_SEND: 'WALLET_TOKEN_SEND',
  WALLET_SCAN_QR: 'WALLET_SCAN_QR',
  WALLET_TRANSACTION_RESULT: 'WALLET_TRANSACTION_RESULT',
  WALLET_TRANSACTION_HISTORY: 'WALLET_TRANSACTION_HISTORY',
  WALLET_TRANSACTION_SPEED_UP: 'WALLET_TRANSACTION_SPEED_UP',
  WALLET_TRANSACTION_CANCEL: 'WALLET_TRANSACTION_CANCEL',
} as const;

export type RouteName = valueOf<typeof WALLET_STACK_ROUTE>;

export type TWalletStackNavigationProps<T extends RouteName> = NativeStackNavigationProp<TWalletStackParamList, T>;

export type TWalletStackScreenProps<T extends keyof TWalletStackParamList> = NativeStackScreenProps<TWalletStackParamList, T>;
