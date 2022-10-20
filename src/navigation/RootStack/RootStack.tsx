import React from 'react';

import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native';

import BackButton from '@@components/BasicComponents/Header/BackButton';
import Title from '@@components/BasicComponents/Header/Title';
import { GlobalModal } from '@@components/Modals/GlobalModal';
import AuthStack from '@@navigation/AuthStack';
import MainTab from '@@navigation/MainTab';
import SettingAppVersion from '@@screens/Setting/SettingAppVersion';
import SettingDeleteAccount from '@@screens/Setting/SettingDeleteAccount';
import SettingDeleteAccountSuccess from '@@screens/Setting/SettingDeleteAccount/SettingDeleteAccountSuccess';
import SettingFAQ from '@@screens/Setting/SettingFAQ';
import SettingPrivacyPolicy from '@@screens/Setting/SettingPrivacyPolicy';
import SettingSecurity from '@@screens/Setting/SettingSecurity';
import SettingPrivateKey from '@@screens/Setting/SettingSecurity/SettingPrivateKey';
import SettingTermsOfService from '@@screens/Setting/SettingTermsOfService';
import settingPersistStore from '@@store/setting/settingPersistStore';
import { theme } from '@@style/theme';
import { fontSize } from '@@utils/ui';

import { ROOT_STACK_ROUTE, TRootStackParamList } from './RootStack.type';

const { Navigator, Screen } = createNativeStackNavigator<TRootStackParamList>();

type ScreenProps = Parameters<typeof Screen>[0];
const routerTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
  },
};

function RootStack() {
  const { t } = useTranslation();
  const { appTheme } = settingPersistStore();
  const color = theme[appTheme.label].color;
  const screens: Array<ScreenProps> = [
    {
      name: ROOT_STACK_ROUTE.AUTH,
      component: AuthStack,
      options: {
        headerShown: false,
      },
    },
    {
      name: ROOT_STACK_ROUTE.MAIN,
      component: MainTab,
      options: {
        headerShown: false,
      },
    },
    {
      name: ROOT_STACK_ROUTE.SETTING_PRIVACY_POLITY,
      component: SettingPrivacyPolicy,
      options: {
        headerLeft: () => <BackButton />,
        headerTitle: () => <Title label={t('privacy_policy')} />,
      },
    },
    {
      name: ROOT_STACK_ROUTE.SETTING_SECURITY,
      component: SettingSecurity,
      options: {
        headerLeft: () => <BackButton />,
        headerTitle: () => <Title label={t('security')} />,
      },
    },
    {
      name: ROOT_STACK_ROUTE.SETTING_TERMS_OF_SERVICE,
      component: SettingTermsOfService,
      options: {
        headerLeft: () => <BackButton />,
        headerTitle: () => <Title label={t('terms_of_service')} />,
      },
    },
    {
      name: ROOT_STACK_ROUTE.SETTING_DELETE_ACCOUNT,
      component: SettingDeleteAccount,
      options: {
        headerLeft: () => <BackButton />,
        headerTitle: () => <Title label={t('delete_account')} />,
      },
    },
    {
      name: ROOT_STACK_ROUTE.SETTING_DELETE_ACCOUNT_SUCCESS,
      component: SettingDeleteAccountSuccess,
      options: {
        headerShown: false,
      },
    },
    {
      name: ROOT_STACK_ROUTE.SETTING_APP_VERSION,
      component: SettingAppVersion,
      options: {
        headerLeft: () => <BackButton />,
        headerTitle: () => <Title label='' />,
      },
    },
    {
      name: ROOT_STACK_ROUTE.SETTING_PRIVATE_KEY,
      component: SettingPrivateKey,
      options: {
        headerLeft: () => <BackButton />,
        headerTitle: () => <Title label={t('private_key')} />,
      },
    },
    {
      name: ROOT_STACK_ROUTE.SETTING_FAQ,
      component: SettingFAQ,
      options: {
        headerLeft: () => <BackButton />,
        headerTitle: () => <Title label={t('faq')} />,
      },
    },
  ];
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer theme={routerTheme}>
        <Navigator
          initialRouteName={ROOT_STACK_ROUTE.AUTH}
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
            },
          })}
        >
          {screens.map((props) => (
            <Screen key={props.name} {...props} />
          ))}
        </Navigator>
        <GlobalModal />
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default RootStack;
