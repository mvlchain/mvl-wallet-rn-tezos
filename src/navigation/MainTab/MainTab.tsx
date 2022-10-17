import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { BrowserNormal, BrowserSelected, HomeNormal, HomeSelected, SettingNormal, SettingSelected, TradeNormal, TradeSelected } from '@@assets/image';
import SettingStack from '@@navigation/SettingStack';
import Browser from '@@screens/Browser';
import Trade from '@@screens/Trade';
import Wallet from '@@screens/Wallet';

import { MAIN_TAB_ROUTE, TMainTabParamList } from './MainTab.type';

const { Navigator, Screen } = createBottomTabNavigator<TMainTabParamList>();

type ScreenProps = Parameters<typeof Screen>[0];

const screens: Array<ScreenProps> = [
  {
    name: MAIN_TAB_ROUTE.WALLET,
    component: Wallet,
    options: {
      tabBarIcon: ({ size, focused }) => (focused ? <HomeSelected width={size} height={size} /> : <HomeNormal width={size} height={size} />),
    },
  },
  {
    name: MAIN_TAB_ROUTE.BROWSER,
    component: Browser,
    options: {
      tabBarIcon: ({ size, focused }) => (focused ? <BrowserSelected width={size} height={size} /> : <BrowserNormal width={size} height={size} />),
    },
  },
  {
    name: MAIN_TAB_ROUTE.TRADE,
    component: Trade,
    options: {
      tabBarIcon: ({ size, focused }) => (focused ? <TradeSelected width={size} height={size} /> : <TradeNormal width={size} height={size} />),
    },
  },
  {
    name: MAIN_TAB_ROUTE.SETTING,
    component: SettingStack,
    options: {
      tabBarIcon: ({ size, focused }) => (focused ? <SettingSelected width={size} height={size} /> : <SettingNormal width={size} height={size} />),
    },
  },
];

function MainTab() {
  return (
    <Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      {screens.map((props) => (
        <Screen key={props.name} {...props} />
      ))}
    </Navigator>
  );
}

export default MainTab;
