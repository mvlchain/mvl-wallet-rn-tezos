import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
  BrowserNormalLight,
  BrowserSelectedLight,
  HomeNormalLight,
  HomeSelectedLight,
  SettingNormalLight,
  SettingSelectedLight,
  TradeNormalLight,
  TradeSelectedLight,
} from '@@assets/image';
import Browser from '@@screens/Browser';
import Setting from '@@screens/Setting';
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
      tabBarIcon: ({ size, focused }) =>
        focused ? <HomeSelectedLight width={size} height={size} /> : <HomeNormalLight width={size} height={size} />,
    },
  },
  {
    name: MAIN_TAB_ROUTE.BROWSER,
    component: Browser,
    options: {
      tabBarIcon: ({ size, focused }) =>
        focused ? <BrowserSelectedLight width={size} height={size} /> : <BrowserNormalLight width={size} height={size} />,
    },
  },
  {
    name: MAIN_TAB_ROUTE.TRADE,
    component: Trade,
    options: {
      tabBarIcon: ({ size, focused }) =>
        focused ? <TradeSelectedLight width={size} height={size} /> : <TradeNormalLight width={size} height={size} />,
    },
  },
  {
    name: MAIN_TAB_ROUTE.SETTING_MAIN,
    component: Setting,
    options: {
      tabBarIcon: ({ size, focused }) =>
        focused ? <SettingSelectedLight width={size} height={size} /> : <SettingNormalLight width={size} height={size} />,
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
