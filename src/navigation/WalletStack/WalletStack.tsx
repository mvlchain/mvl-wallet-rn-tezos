import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Wallet from '@@screens/Wallet';
import WalletEditTokenList from '@@screens/Wallet/WalletEditTokenList';
import WalletScanQR from '@@screens/Wallet/WalletScanQR';
import WalletTokenDetail from '@@screens/Wallet/WalletTokenDetail';
import WalletTokenReceive from '@@screens/Wallet/WalletTokenReceive';
import WalletTokenReceiveSelect from '@@screens/Wallet/WalletTokenReceiveSelect';
import WalletTokenSend from '@@screens/Wallet/WalletTokenSend';
import WalletTransactionCancel from '@@screens/Wallet/WalletTransactionCancel';
import WalletTransactionHistory from '@@screens/Wallet/WalletTransactionHistory';
import WalletTransactionResult from '@@screens/Wallet/WalletTransactionResult';
import WalletTransactionSpeedUp from '@@screens/Wallet/WalletTransactionSpeedUp';

import { WALLET_STACK_ROUTE, TWalletStackParamList } from './WalletStack.type';

const { Navigator, Screen } = createNativeStackNavigator<TWalletStackParamList>();

type ScreenProps = Parameters<typeof Screen>[0];

// TODO: header 추가하기
const screens: Array<ScreenProps> = [
  {
    name: WALLET_STACK_ROUTE.WALLET,
    component: Wallet,
  },
  {
    name: WALLET_STACK_ROUTE.WALLET_EDIT_TOKEN_LIST,
    component: WalletEditTokenList,
  },
  {
    name: WALLET_STACK_ROUTE.WALLET_TOKEN_DETAIL,
    component: WalletTokenDetail,
  },
  {
    name: WALLET_STACK_ROUTE.WALLET_TOKEN_RECEIVE,
    component: WalletTokenReceive,
  },
  {
    name: WALLET_STACK_ROUTE.WALLET_TOKEN_RECEIVE_SELECT,
    component: WalletTokenReceiveSelect,
  },
  {
    name: WALLET_STACK_ROUTE.WALLET_TOKEN_SEND,
    component: WalletTokenSend,
  },
  {
    name: WALLET_STACK_ROUTE.WALLET_SCAN_QR,
    component: WalletScanQR,
  },
  {
    name: WALLET_STACK_ROUTE.WALLET_TRANSACTION_RESULT,
    component: WalletTransactionResult,
  },
  {
    name: WALLET_STACK_ROUTE.WALLET_TRANSACTION_HISTORY,
    component: WalletTransactionHistory,
  },
  {
    name: WALLET_STACK_ROUTE.WALLET_TRANSACTION_SPEED_UP,
    component: WalletTransactionSpeedUp,
  },
  {
    name: WALLET_STACK_ROUTE.WALLET_TRANSACTION_CANCEL,
    component: WalletTransactionCancel,
  },
];

function WalletStack() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {screens.map((props) => (
        <Screen key={props.name} {...props} />
      ))}
    </Navigator>
  );
}

export default WalletStack;
