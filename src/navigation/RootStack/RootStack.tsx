import React from 'react';

import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native';

import PinModal from '@@components/BasicComponents/Modals/Auth/PinModal';
import PincodeGuideModal from '@@components/BasicComponents/Modals/Auth/PincodeGuideModal';
import TermsOfServicesModal from '@@components/BasicComponents/Modals/Auth/TermsOfServicesModal';
import { ToastPopup } from '@@components/BasicComponents/Modals/BaseModal/ToastPopup';
import { GlobalModal } from '@@components/BasicComponents/Modals/GlobalModal';
import useHeader from '@@hooks/useHeader';
import { useColor } from '@@hooks/useTheme';
import AuthStack from '@@navigation/AuthStack';
import MainTab from '@@navigation/MainTab';
import ConfirmSeedPhraseScreen from '@@screens/Mnemonic/ConfirmSeedPhraseScreen';
import SeedPhraseScreen from '@@screens/Mnemonic/SeedPhraseScreen';
import SettingAppVersionScreen from '@@screens/SettingScreen/SettingAppVersionScreen';
import SettingDeleteAccountScreen from '@@screens/SettingScreen/SettingDeleteAccountScreen';
import SettingDeleteAccountSuccessScreen from '@@screens/SettingScreen/SettingDeleteAccountScreen/SettingDeleteAccountSuccessScreen';
import SettingFAQScreen from '@@screens/SettingScreen/SettingFAQScreen';
import SettingPrivacyPolicyScreen from '@@screens/SettingScreen/SettingPrivacyPolicyScreen';
import SettingSecurityScreen from '@@screens/SettingScreen/SettingSecurityScreen';
import SettingPrivateKeyScreen from '@@screens/SettingScreen/SettingSecurityScreen/SettingPrivateKeyScreen';
import SettingTermsOfServiceScreen from '@@screens/SettingScreen/SettingTermsOfServiceScreen';
import WalletTokenSend from '@@screens/Wallet/WalletTokenSend';
import WalletEditTokenListScreen from '@@screens/WalletScreen/WalletEditTokenListScreen';
import WalletScanQR from '@@screens/WalletScreen/WalletScanQR';
import WalletTokenDetail from '@@screens/WalletScreen/WalletTokenDetail';
import WalletTransactionCancel from '@@screens/WalletScreen/WalletTransactionCancel';
import WalletTransactionHistory from '@@screens/WalletScreen/WalletTransactionHistory';
import WalletTransactionSpeedUp from '@@screens/WalletScreen/WalletTransactionSpeedUp';
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
  const { handleStackHeaderOption } = useHeader();
  const { color } = useColor();

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
      name: ROOT_STACK_ROUTE.WALLET_EDIT_TOKEN_LIST,
      component: WalletEditTokenListScreen,
      options: handleStackHeaderOption({ title: t('token_editor_title') }),
    },
    {
      name: ROOT_STACK_ROUTE.SETTING_PRIVACY_POLITY,
      component: SettingPrivacyPolicyScreen,
      options: handleStackHeaderOption({ title: '' }),
    },
    {
      name: ROOT_STACK_ROUTE.SETTING_SECURITY,
      component: SettingSecurityScreen,
      options: handleStackHeaderOption({ title: t('security') }),
    },
    {
      name: ROOT_STACK_ROUTE.SETTING_TERMS_OF_SERVICE,
      component: SettingTermsOfServiceScreen,
      options: handleStackHeaderOption({ title: '' }),
    },
    {
      name: ROOT_STACK_ROUTE.SETTING_DELETE_ACCOUNT,
      component: SettingDeleteAccountScreen,
      options: handleStackHeaderOption({ title: t('delete_account') }),
    },
    {
      name: ROOT_STACK_ROUTE.SETTING_DELETE_ACCOUNT_SUCCESS,
      component: SettingDeleteAccountSuccessScreen,
      options: {
        headerShown: false,
      },
    },
    {
      name: ROOT_STACK_ROUTE.SETTING_APP_VERSION,
      component: SettingAppVersionScreen,
      options: handleStackHeaderOption({ title: '' }),
    },
    {
      name: ROOT_STACK_ROUTE.SETTING_PRIVATE_KEY,
      component: SettingPrivateKeyScreen,
      options: handleStackHeaderOption({ title: t('private_key') }),
    },
    {
      name: ROOT_STACK_ROUTE.SETTING_FAQ,
      component: SettingFAQScreen,
      options: handleStackHeaderOption({ title: t('faq') }),
    },
    {
      name: ROOT_STACK_ROUTE.WALLET_TOKEN_DETAIL,
      component: WalletTokenDetail,
    },
    {
      name: ROOT_STACK_ROUTE.WALLET_TOKEN_SEND,
      component: WalletTokenSend,
    },
    {
      name: ROOT_STACK_ROUTE.WALLET_TRANSACTION_HISTORY,
      component: WalletTransactionHistory,
    },
    {
      name: ROOT_STACK_ROUTE.WALLET_TRANSACTION_SPEED_UP,
      component: WalletTransactionSpeedUp,
    },
    {
      name: ROOT_STACK_ROUTE.WALLET_TRANSACTION_CANCEL,
      component: WalletTransactionCancel,
    },
    {
      name: ROOT_STACK_ROUTE.WALLET_SCAN_QR,
      component: WalletScanQR,
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
        <PinModal />
        <TermsOfServicesModal />
        <PincodeGuideModal />
        <GlobalModal />
        <ToastPopup />
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default RootStack;
