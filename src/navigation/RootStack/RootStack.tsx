import React from 'react';

import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native';

import { ToastPopup } from '@@components/BasicComponents/Modals/ToastPopup';
import PincodeGuideModal from '@@components/Modals/Auth/PincodeGuideModal';
import TermsOfServicesModal from '@@components/Modals/Auth/TermsOfServicesModal';
import { GlobalModal } from '@@components/Modals/GlobalModal';
import PinModal from '@@components/Modals/PinModal';
import useHeader from '@@hooks/common/useHeader';
import AuthStack from '@@navigation/AuthStack';
import MainTab from '@@navigation/MainTab';
import ConfirmSeedPhraseScreen from '@@screens/Mnemonic/ConfirmSeedPhraseScreen';
import SeedPhraseScreen from '@@screens/Mnemonic/SeedPhraseScreen';
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
import { fontSize, height } from '@@utils/ui';

import { ROOT_STACK_ROUTE, TRootStackParamList } from './RootStack.type';

const { Navigator, Screen } = createStackNavigator<TRootStackParamList>();

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
  const { handleStackHeaderOption } = useHeader();
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
      name: ROOT_STACK_ROUTE.SEED_PHRASE,
      component: SeedPhraseScreen,
    },
    {
      name: ROOT_STACK_ROUTE.SEED_PHRASE_CONFIRM,
      component: ConfirmSeedPhraseScreen,
      options: handleStackHeaderOption({ title: t('confirm_seed_phrase_lbl_title') }),
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
      options: handleStackHeaderOption({ title: t('privacy_policy') }),
    },
    {
      name: ROOT_STACK_ROUTE.SETTING_SECURITY,
      component: SettingSecurity,
      options: handleStackHeaderOption({ title: t('security') }),
    },
    {
      name: ROOT_STACK_ROUTE.SETTING_TERMS_OF_SERVICE,
      component: SettingTermsOfService,
      options: handleStackHeaderOption({ title: t('terms_of_service') }),
    },
    {
      name: ROOT_STACK_ROUTE.SETTING_DELETE_ACCOUNT,
      component: SettingDeleteAccount,
      options: handleStackHeaderOption({ title: t('delete_account') }),
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
      options: handleStackHeaderOption({ title: '' }),
    },
    {
      name: ROOT_STACK_ROUTE.SETTING_PRIVATE_KEY,
      component: SettingPrivateKey,
      options: handleStackHeaderOption({ title: t('private_key') }),
    },
    {
      name: ROOT_STACK_ROUTE.SETTING_FAQ,
      component: SettingFAQ,
      options: handleStackHeaderOption({ title: t('faq') }),
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
              height: height * 56,
            },
          })}
        >
          {screens.map((props) => (
            <Screen key={props.name} {...props} />
          ))}
        </Navigator>
        <PinModal isFull={true} />
        <TermsOfServicesModal />
        <PincodeGuideModal />
        <GlobalModal />
        <ToastPopup />
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default RootStack;
