import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import WalletScreen from '@@screens/WalletScreen';
import WalletScanQR from '@@screens/WalletScreen/WalletScanQR';
import WalletTokenDetail from '@@screens/WalletScreen/WalletTokenDetail';
import WalletTokenReceive from '@@screens/WalletScreen/WalletTokenReceive';
import WalletTokenReceiveSelect from '@@screens/WalletScreen/WalletTokenReceiveSelect';
import WalletTokenSend from '@@screens/WalletScreen/WalletTokenSend';
import WalletTransactionCancel from '@@screens/WalletScreen/WalletTransactionCancel';
import WalletTransactionHistory from '@@screens/WalletScreen/WalletTransactionHistory';
import WalletTransactionResult from '@@screens/WalletScreen/WalletTransactionResult';
import WalletTransactionSpeedUp from '@@screens/WalletScreen/WalletTransactionSpeedUp';
import settingPersistStore from '@@store/setting/settingPersistStore';
import { theme } from '@@style/theme';
import { fontSize, height } from '@@utils/ui';

import { WALLET_STACK_ROUTE, TWalletStackParamList } from './WalletStack.type';

function WalletStack() {
  const { appTheme } = settingPersistStore();
  const color = theme[appTheme.value].color;
  const { Navigator, Screen } = createStackNavigator<TWalletStackParamList>();

  type ScreenProps = Parameters<typeof Screen>[0];

  // TODO: header 추가하기
  const screens: Array<ScreenProps> = [
    {
      name: WALLET_STACK_ROUTE.WALLET,
      component: WalletScreen,
      options: {
        headerShown: false,
      },
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
      name: WALLET_STACK_ROUTE.WALLET_TRANSACTION_RESULT,
      component: WalletTransactionResult,
    },
  ];

  return (
    <Navigator
      initialRouteName={WALLET_STACK_ROUTE.WALLET}
      screenOptions={() => ({
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: fontSize(20),
          fontFamily: 'AppleSDGothicNeoH00',
          fontWeight: '800',
          color: color.blackWhite,
        },
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: color.whiteBlack,
          height: height * 56,
        },
      })}
    >
      {screens.map((props) => (
        <Screen key={props.name} {...props} />
      ))}
    </Navigator>
  );
}

export default WalletStack;
