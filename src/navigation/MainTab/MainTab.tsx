import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
  BrowserNormalLight,
  BrowserSelectedLight,
  BrowserNormalDark,
  BrowserSelectedDark,
  HomeNormalLight,
  HomeSelectedLight,
  HomeNormalDark,
  HomeSelectedDark,
  SettingNormalLight,
  SettingSelectedLight,
  SettingNormalDark,
  SettingSelectedDark,
  TradeNormalLight,
  TradeSelectedLight,
  TradeNormalDark,
  TradeSelectedDark,
} from '@@assets/image';
import { useAssetFromTheme } from '@@hooks/common/useTheme';
import WalletStack from '@@navigation/WalletStack';
import Browser from '@@screens/Browser';
import SettingScreen from '@@screens/SettingScreen';
import Trade from '@@screens/Trade';
import settingPersistStore from '@@store/setting/settingPersistStore';
import { theme } from '@@style/theme';
import { height } from '@@utils/ui';

import { MAIN_TAB_ROUTE, TMainTabParamList } from './MainTab.type';

function MainTab() {
  const { Navigator, Screen } = createBottomTabNavigator<TMainTabParamList>();
  type ScreenProps = Parameters<typeof Screen>[0];

  const { appTheme } = settingPersistStore();
  const color = theme[appTheme.label].color;
  const backgorundColor = color.whiteBlack;

  const HomeNormal = useAssetFromTheme(HomeNormalLight, HomeNormalDark);
  const HomeSelected = useAssetFromTheme(HomeSelectedLight, HomeSelectedDark);
  const BrowserNormal = useAssetFromTheme(BrowserNormalLight, BrowserNormalDark);
  const BrowserSelected = useAssetFromTheme(BrowserSelectedLight, BrowserSelectedDark);
  const TradeNormal = useAssetFromTheme(TradeNormalLight, TradeNormalDark);
  const TradeSelected = useAssetFromTheme(TradeSelectedLight, TradeSelectedDark);
  const SettingNormal = useAssetFromTheme(SettingNormalLight, SettingNormalDark);
  const SettingSelected = useAssetFromTheme(SettingSelectedLight, SettingSelectedDark);

  const screens: Array<ScreenProps> = [
    {
      name: MAIN_TAB_ROUTE.WALLET,
      component: WalletStack,
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
      name: MAIN_TAB_ROUTE.SETTING_MAIN,
      component: SettingScreen,
      options: {
        tabBarIcon: ({ size, focused }) => (focused ? <SettingSelected width={size} height={size} /> : <SettingNormal width={size} height={size} />),
      },
    },
  ];
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
      {screens.map((props) => (
        <Screen key={props.name} {...props} />
      ))}
    </Navigator>
  );
}

export default MainTab;
