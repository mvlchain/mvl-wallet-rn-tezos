import { StackScreenProps, StackNavigationProp } from '@react-navigation/stack';

import { Network } from '@@constants/network.constant';
import { EarnEventDto } from '@@domain/model/EarnEventDto';
import { IGetTransactionHistoryResponse } from '@@domain/transaction/transactionHistoryRepository/TransactionHistoryRepository.type';
import { TokenDto } from '@@store/token/tokenPersistStore.type';
import { valueOf } from '@@utils/types';

export type TRootStackParamList = {
  SEED_PHRASE: {
    onlyCopy?: boolean;
  };
  MAIN: undefined;
  WALLET_EDIT_TOKEN_LIST: undefined;
  SETTING_SECURITY: undefined;
  SETTING_PRIVACY_POLICY: undefined;
  SETTING_TERMS_OF_SERVICE: undefined;
  SETTING_DELETE_ACCOUNT: undefined;
  SETTING_DELETE_ACCOUNT_SUCCESS: undefined;
  SETTING_APP_VERSION: undefined;
  SETTING_PRIVATE_KEY: undefined;
  SETTING_FAQ: undefined;
  WALLET_TOKEN_DETAIL: {
    tokenDto: TokenDto;
  };
  WALLET_TOKEN_SEND: {
    tokenDto: TokenDto;
    scanData?: {
      address: string;
      amount?: string;
    };
  };
  WALLET_TRANSACTION_HISTORY: IGetTransactionHistoryResponse & { tokenDto: TokenDto };
  WALLET_TRANSACTION_SPEED_UP: undefined;
  WALLET_TRANSACTION_CANCEL: undefined;
  WALLET_SCAN_QR: {
    tokenDto?: TokenDto;
  };
  WALLET_TOKEN_RECEIVE: {
    tokenDto: TokenDto;
  };
  WALLET_TRANSACTION_RESULT: undefined;
  WALLET_TOKEN_RECEIVE_SELECT: {
    network: Network;
    address: string;
  };
  EVENT_DETAILS: {
    i: string;
    data: EarnEventDto;
  };
  EARN_EVENT_TRNASFERRING: {
    eventId: string;
    address: string;
  };
  EARN_EVENT_TRANSFER_SUCCESS: undefined;
  BROWSER_SEARCH: undefined;
  BROWSER_DAPP: { link: string };
};

export type RootStackRouteType = Record<keyof TRootStackParamList, keyof TRootStackParamList>;

export const ROOT_STACK_ROUTE: RootStackRouteType = {
  SEED_PHRASE: 'SEED_PHRASE',
  MAIN: 'MAIN',
  WALLET_EDIT_TOKEN_LIST: 'WALLET_EDIT_TOKEN_LIST',
  SETTING_SECURITY: 'SETTING_SECURITY',
  SETTING_PRIVACY_POLICY: 'SETTING_PRIVACY_POLICY',
  SETTING_TERMS_OF_SERVICE: 'SETTING_TERMS_OF_SERVICE',
  SETTING_DELETE_ACCOUNT: 'SETTING_DELETE_ACCOUNT',
  SETTING_DELETE_ACCOUNT_SUCCESS: 'SETTING_DELETE_ACCOUNT_SUCCESS',
  SETTING_APP_VERSION: 'SETTING_APP_VERSION',
  SETTING_PRIVATE_KEY: 'SETTING_PRIVATE_KEY',
  SETTING_FAQ: 'SETTING_FAQ',
  WALLET_TOKEN_DETAIL: 'WALLET_TOKEN_DETAIL',
  WALLET_TOKEN_SEND: 'WALLET_TOKEN_SEND',
  WALLET_TRANSACTION_HISTORY: 'WALLET_TRANSACTION_HISTORY',
  WALLET_TRANSACTION_SPEED_UP: 'WALLET_TRANSACTION_SPEED_UP',
  WALLET_TRANSACTION_CANCEL: 'WALLET_TRANSACTION_CANCEL',
  WALLET_SCAN_QR: 'WALLET_SCAN_QR',
  WALLET_TOKEN_RECEIVE: 'WALLET_TOKEN_RECEIVE',
  WALLET_TRANSACTION_RESULT: 'WALLET_TRANSACTION_RESULT',
  WALLET_TOKEN_RECEIVE_SELECT: 'WALLET_TOKEN_RECEIVE_SELECT',
  EVENT_DETAILS: 'EVENT_DETAILS',
  EARN_EVENT_TRNASFERRING: 'EARN_EVENT_TRNASFERRING',
  EARN_EVENT_TRANSFER_SUCCESS: 'EARN_EVENT_TRANSFER_SUCCESS',
  BROWSER_SEARCH: 'BROWSER_SEARCH',
  BROWSER_DAPP: 'BROWSER_DAPP',
} as const;

export type RouteName = valueOf<typeof ROOT_STACK_ROUTE>;

export type TRootStackNavigationProps<T extends RouteName> = StackNavigationProp<TRootStackParamList, T>;

export type TRootStackScreenProps<T extends keyof TRootStackParamList> = StackScreenProps<TRootStackParamList, T>;
