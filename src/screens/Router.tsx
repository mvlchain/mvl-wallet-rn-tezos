import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import { ROUTE_NAME } from '@@assets/constants';
import { BrowserNormal, BrowserSelected, HomeNormal, HomeSelected, SettingNormal, SettingSelected, TradeNormal, TradeSelected } from '@@assets/image';
import Browser from '@@screens/Browser';
import Home from '@@screens/Home';
import Setting from '@@screens/Setting';
import Trade from '@@screens/Trade';

const Wallet = createBottomTabNavigator();

type ScreenProps = Parameters<typeof Wallet.Screen>[0];

const screens: Array<ScreenProps> = [
  {
    name: ROUTE_NAME.HOME,
    component: Home,
    options: {
      tabBarIcon: ({ size, focused }) => (focused ? <HomeSelected width={size} height={size} /> : <HomeNormal width={size} height={size} />),
    },
  },
  {
    name: ROUTE_NAME.BROWSER,
    component: Browser,
    options: {
      tabBarIcon: ({ size, focused }) => (focused ? <BrowserSelected width={size} height={size} /> : <BrowserNormal width={size} height={size} />),
    },
  },
  {
    name: ROUTE_NAME.TRADE,
    component: Trade,
    options: {
      tabBarIcon: ({ size, focused }) => (focused ? <TradeSelected width={size} height={size} /> : <TradeNormal width={size} height={size} />),
    },
  },
  {
    name: ROUTE_NAME.SETTING,
    component: Setting,
    options: {
      tabBarIcon: ({ size, focused }) => (focused ? <SettingSelected width={size} height={size} /> : <SettingNormal width={size} height={size} />),
    },
  },
];

function Router() {
  return (
    <NavigationContainer>
      <Wallet.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
        }}
      >
        {screens.map((props) => (
          <Wallet.Screen key={props.name} {...props} />
        ))}
      </Wallet.Navigator>
    </NavigationContainer>
  );
}

export default Router;
