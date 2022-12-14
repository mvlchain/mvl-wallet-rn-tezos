/* eslint-disable max-lines */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';

import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native';

import LoadingIndicator from '@@components/BasicComponents/LoadingIndicator';
import PinModal from '@@components/BasicComponents/Modals/Auth/PinModal';
import PincodeGuideModal from '@@components/BasicComponents/Modals/Auth/PincodeGuideModal';
import TermsOfServicesModal from '@@components/BasicComponents/Modals/Auth/TermsOfServicesModal';
import { ToastPopup } from '@@components/BasicComponents/Modals/BaseModal/ToastPopup';
import { GlobalModal } from '@@components/BasicComponents/Modals/GlobalModal';
import useHeader from '@@hooks/useHeader';
import { useColor } from '@@hooks/useTheme';
import AuthStack from '@@navigation/AuthStack';
import { linking } from '@@navigation/DeepLink';
import MainTab from '@@navigation/MainTab';
import { EarnEventDetailsScreen } from '@@screens/EarnEventScreen';
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
import WalletEditTokenListScreen from '@@screens/WalletScreen/WalletEditTokenListScreen';
import WalletScanQR from '@@screens/WalletScreen/WalletScanQR';
import WalletTokenDetail from '@@screens/WalletScreen/WalletTokenDetail';
import WalletTokenReceive from '@@screens/WalletScreen/WalletTokenReceive';
import WalletTokenReceiveSelect from '@@screens/WalletScreen/WalletTokenReceiveSelect';
import WalletTokenSend from '@@screens/WalletScreen/WalletTokenSend';
import WalletTransactionCancel from '@@screens/WalletScreen/WalletTransactionCancel';
import WalletTransactionHistory from '@@screens/WalletScreen/WalletTransactionHistory';
import WalletTransactionResult from '@@screens/WalletScreen/WalletTransactionResult';
import WalletTransactionSpeedUp from '@@screens/WalletScreen/WalletTransactionSpeedUp';
import { fontSize, height } from '@@utils/ui';

import { navigationRef } from './RootNavigation';
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
      options: handleStackHeaderOption({ title: t('send') }),
    },
    {
      name: ROOT_STACK_ROUTE.WALLET_TRANSACTION_HISTORY,
      component: WalletTransactionHistory,
      options: handleStackHeaderOption({ title: t('transaction_history') }),
    },
    {
      name: ROOT_STACK_ROUTE.WALLET_TRANSACTION_SPEED_UP,
      component: WalletTransactionSpeedUp,
      options: handleStackHeaderOption({ title: t('speed_up') }),
    },
    {
      name: ROOT_STACK_ROUTE.WALLET_TRANSACTION_CANCEL,
      component: WalletTransactionCancel,
      options: handleStackHeaderOption({ title: t('cancel_transaction') }),
    },
    {
      name: ROOT_STACK_ROUTE.WALLET_SCAN_QR,
      component: WalletScanQR,
      options: handleStackHeaderOption({ title: t('scan_qr_code') }),
    },
    {
      name: ROOT_STACK_ROUTE.WALLET_TOKEN_RECEIVE,
      component: WalletTokenReceive,
      options: handleStackHeaderOption({ title: t('receive') }),
    },

    {
      name: ROOT_STACK_ROUTE.WALLET_TRANSACTION_RESULT,
      component: WalletTransactionResult,
      options: {
        headerShown: false,
      },
    },
    {
      name: ROOT_STACK_ROUTE.WALLET_TOKEN_RECEIVE_SELECT,
      component: WalletTokenReceiveSelect,
      options: handleStackHeaderOption({ title: t('receive') }),
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer ref={navigationRef} theme={routerTheme} linking={linking}>
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
          <Screen name={ROOT_STACK_ROUTE.EVENT_DETAILS} component={EarnEventDetailsScreen} options={handleStackHeaderOption({ title: '' })} />
        </Navigator>
        <LoadingIndicator />
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
