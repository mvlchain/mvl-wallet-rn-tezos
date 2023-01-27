import React, { useEffect } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
  HomeNormalLight,
  HomeSelectedLight,
  HomeNormalDark,
  HomeSelectedDark,
  BrowserNormalLight,
  BrowserSelectedLight,
  BrowserNormalDark,
  BrowserSelectedDark,
  EventNormalLight,
  EventSelectedLight,
  EventNormalDark,
  EventSelectedDark,
  SettingNormalLight,
  SettingSelectedLight,
  SettingNormalDark,
  SettingSelectedDark,
  TradeNormalLight,
  TradeSelectedLight,
  TradeNormalDark,
  TradeSelectedDark,
} from '@@assets/image';
import { useAssetFromTheme, useColor } from '@@hooks/useTheme';
import BrowserMainScreen from '@@screens/Browser/BrowserMainScreen';
import { EarnEventListScreen } from '@@screens/EarnEventScreen';
import SettingScreen from '@@screens/SettingScreen';
import TradeScreen from '@@screens/TradeScreen';
import WalletScreen from '@@screens/WalletScreen';
import { height } from '@@utils/ui';

import { MAIN_TAB_ROUTE, TMainTabParamList } from './MainTab.type';

function MainTab() {
  const { Navigator, Screen } = createBottomTabNavigator<TMainTabParamList>();

  const { color } = useColor();
  const backgorundColor = color.whiteBlack;

  const HomeNormal = useAssetFromTheme(HomeNormalLight, HomeNormalDark);
  const HomeSelected = useAssetFromTheme(HomeSelectedLight, HomeSelectedDark);
  const BrowserNormal = useAssetFromTheme(BrowserNormalLight, BrowserNormalDark);
  const BrowserSelected = useAssetFromTheme(BrowserSelectedLight, BrowserSelectedDark);
  const EventNormal = useAssetFromTheme(EventNormalLight, EventNormalDark);
  const EventSelected = useAssetFromTheme(EventSelectedLight, EventSelectedDark);
  const TradeNormal = useAssetFromTheme(TradeNormalLight, TradeNormalDark);
  const TradeSelected = useAssetFromTheme(TradeSelectedLight, TradeSelectedDark);
  const SettingNormal = useAssetFromTheme(SettingNormalLight, SettingNormalDark);
  const SettingSelected = useAssetFromTheme(SettingSelectedLight, SettingSelectedDark);

  return (
    <Navigator
      backBehavior='history'
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          borderTopColor: color.grey100Grey900,
          borderTopWidth: 1,
          height: height * 64,
        },
        tabBarActiveBackgroundColor: backgorundColor,
        tabBarInactiveBackgroundColor: backgorundColor,
      }}
    >
      <Screen
        key={MAIN_TAB_ROUTE.WALLET}
        name={MAIN_TAB_ROUTE.WALLET}
        component={WalletScreen}
        options={{
          tabBarIcon: ({ size, focused }) => (focused ? <HomeSelected width={size} height={size} /> : <HomeNormal width={size} height={size} />),
        }}
      />
      <Screen
        key={MAIN_TAB_ROUTE.BROWSER}
        name={MAIN_TAB_ROUTE.BROWSER}
        component={BrowserMainScreen}
        options={{
          tabBarIcon: ({ size, focused }) =>
            focused ? <BrowserSelected width={size} height={size} /> : <BrowserNormal width={size} height={size} />,
        }}
      />
      <Screen
        key={MAIN_TAB_ROUTE.EVENT}
        name={MAIN_TAB_ROUTE.EVENT}
        component={EarnEventListScreen}
        options={{
          tabBarIcon: ({ size, focused }) => (focused ? <EventSelected width={size} height={size} /> : <EventNormal width={size} height={size} />),
        }}
      />
      <Screen
        key={MAIN_TAB_ROUTE.TRADE}
        name={MAIN_TAB_ROUTE.TRADE}
        component={TradeScreen}
        options={{
          tabBarIcon: ({ size, focused }) => (focused ? <TradeSelected width={size} height={size} /> : <TradeNormal width={size} height={size} />),
        }}
      />
      <Screen
        key={MAIN_TAB_ROUTE.SETTING_MAIN}
        name={MAIN_TAB_ROUTE.SETTING_MAIN}
        component={SettingScreen}
        options={{
          tabBarIcon: ({ size, focused }) =>
            focused ? <SettingSelected width={size} height={size} /> : <SettingNormal width={size} height={size} />,
        }}
      />
    </Navigator>
  );
}

export default MainTab;
