/* eslint-disable max-lines */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';

import { DefaultTheme } from '@react-navigation/native';
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
import MainTab from '@@navigation/MainTab';
import { DeepLinkConnectProxy } from '@@screens/DeepLink';
import { EarnEventDetailsScreen } from '@@screens/EarnEventScreen';
import EarnEventTransferSuccessScreen from '@@screens/EarnEventScreen/EarnEventTransferSuccessScreen';
import EarnEventTransferringScreen from '@@screens/EarnEventScreen/EarnEventTransferringScreen';
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
import gasStore from '@@store/gas/gasStore';
import { transactionRequestStore } from '@@store/transaction/transactionRequestStore';
import { fontSize, height } from '@@utils/ui';

import { ROOT_STACK_ROUTE, TRootStackParamList } from './RootStack.type';
const { Navigator, Screen } = createStackNavigator<TRootStackParamList>();

function RootStack() {
  const { t } = useTranslation();
  const { handleStackHeaderOption } = useHeader();
  const { color } = useColor();
  const { resetState } = gasStore();
  const { resetBody } = transactionRequestStore();

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
        <Screen key={ROOT_STACK_ROUTE.AUTH} name={ROOT_STACK_ROUTE.AUTH} component={AuthStack} options={{ headerShown: false }} />
        <Screen key={ROOT_STACK_ROUTE.SEED_PHRASE} name={ROOT_STACK_ROUTE.SEED_PHRASE} component={SeedPhraseScreen} />
        <Screen
          key={ROOT_STACK_ROUTE.SEED_PHRASE_CONFIRM}
          name={ROOT_STACK_ROUTE.SEED_PHRASE_CONFIRM}
          component={ConfirmSeedPhraseScreen}
          options={handleStackHeaderOption({ title: t('confirm_seed_phrase_lbl_title') })}
        />
        <Screen key={ROOT_STACK_ROUTE.MAIN} name={ROOT_STACK_ROUTE.MAIN} component={MainTab} options={{ headerShown: false }} />
        <Screen
          key={ROOT_STACK_ROUTE.WALLET_EDIT_TOKEN_LIST}
          name={ROOT_STACK_ROUTE.WALLET_EDIT_TOKEN_LIST}
          component={WalletEditTokenListScreen}
          options={handleStackHeaderOption({ title: t('token_editor_title') })}
        />
        <Screen
          key={ROOT_STACK_ROUTE.SETTING_PRIVACY_POLITY}
          name={ROOT_STACK_ROUTE.SETTING_PRIVACY_POLITY}
          component={SettingPrivacyPolicyScreen}
          options={handleStackHeaderOption({ title: t('') })}
        />
        <Screen
          key={ROOT_STACK_ROUTE.SETTING_SECURITY}
          name={ROOT_STACK_ROUTE.SETTING_SECURITY}
          component={SettingSecurityScreen}
          options={handleStackHeaderOption({ title: t('security') })}
        />
        <Screen
          key={ROOT_STACK_ROUTE.SETTING_TERMS_OF_SERVICE}
          name={ROOT_STACK_ROUTE.SETTING_TERMS_OF_SERVICE}
          component={SettingTermsOfServiceScreen}
          options={handleStackHeaderOption({ title: t('') })}
        />
        <Screen
          key={ROOT_STACK_ROUTE.SETTING_DELETE_ACCOUNT}
          name={ROOT_STACK_ROUTE.SETTING_DELETE_ACCOUNT}
          component={SettingDeleteAccountScreen}
          options={handleStackHeaderOption({ title: t('delete_account') })}
        />
        <Screen
          key={ROOT_STACK_ROUTE.SETTING_DELETE_ACCOUNT_SUCCESS}
          name={ROOT_STACK_ROUTE.SETTING_DELETE_ACCOUNT_SUCCESS}
          component={SettingDeleteAccountSuccessScreen}
          options={{ headerShown: false }}
        />
        <Screen
          key={ROOT_STACK_ROUTE.SETTING_APP_VERSION}
          name={ROOT_STACK_ROUTE.SETTING_APP_VERSION}
          component={SettingAppVersionScreen}
          options={handleStackHeaderOption({ title: t('') })}
        />
        <Screen
          key={ROOT_STACK_ROUTE.SETTING_PRIVATE_KEY}
          name={ROOT_STACK_ROUTE.SETTING_PRIVATE_KEY}
          component={SettingPrivateKeyScreen}
          options={handleStackHeaderOption({ title: t('private_key') })}
        />
        <Screen
          key={ROOT_STACK_ROUTE.SETTING_FAQ}
          name={ROOT_STACK_ROUTE.SETTING_FAQ}
          component={SettingFAQScreen}
          options={handleStackHeaderOption({ title: t('faq') })}
        />
        <Screen key={ROOT_STACK_ROUTE.WALLET_TOKEN_DETAIL} name={ROOT_STACK_ROUTE.WALLET_TOKEN_DETAIL} component={WalletTokenDetail} />
        <Screen
          key={ROOT_STACK_ROUTE.WALLET_TOKEN_SEND}
          name={ROOT_STACK_ROUTE.WALLET_TOKEN_SEND}
          component={WalletTokenSend}
          options={handleStackHeaderOption({
            title: t('send'),
            onPressBack: () => {
              resetState();
              resetBody();
            },
          })}
        />
        <Screen
          key={ROOT_STACK_ROUTE.WALLET_TRANSACTION_HISTORY}
          name={ROOT_STACK_ROUTE.WALLET_TRANSACTION_HISTORY}
          component={WalletTransactionHistory}
          options={handleStackHeaderOption({ title: t('transaction_history') })}
        />
        <Screen
          key={ROOT_STACK_ROUTE.WALLET_TRANSACTION_SPEED_UP}
          name={ROOT_STACK_ROUTE.WALLET_TRANSACTION_SPEED_UP}
          component={WalletTransactionSpeedUp}
          options={handleStackHeaderOption({ title: t('speed_up') })}
        />
        <Screen
          key={ROOT_STACK_ROUTE.WALLET_TRANSACTION_CANCEL}
          name={ROOT_STACK_ROUTE.WALLET_TRANSACTION_CANCEL}
          component={WalletTransactionCancel}
          options={handleStackHeaderOption({ title: t('cancel_transaction') })}
        />
        <Screen
          key={ROOT_STACK_ROUTE.WALLET_SCAN_QR}
          name={ROOT_STACK_ROUTE.WALLET_SCAN_QR}
          component={WalletScanQR}
          options={handleStackHeaderOption({ title: t('scan_qr_code') })}
        />
        <Screen
          key={ROOT_STACK_ROUTE.WALLET_TOKEN_RECEIVE}
          name={ROOT_STACK_ROUTE.WALLET_TOKEN_RECEIVE}
          component={WalletTokenReceive}
          options={handleStackHeaderOption({ title: t('receive') })}
        />
        <Screen
          key={ROOT_STACK_ROUTE.WALLET_TRANSACTION_RESULT}
          name={ROOT_STACK_ROUTE.WALLET_TRANSACTION_RESULT}
          component={WalletTransactionResult}
          options={{ headerShown: false }}
        />
        <Screen
          key={ROOT_STACK_ROUTE.WALLET_TOKEN_RECEIVE_SELECT}
          name={ROOT_STACK_ROUTE.WALLET_TOKEN_RECEIVE_SELECT}
          component={WalletTokenReceiveSelect}
          options={handleStackHeaderOption({ title: t('receive') })}
        />
        <Screen
          key={ROOT_STACK_ROUTE.EVENT_DETAILS}
          name={ROOT_STACK_ROUTE.EVENT_DETAILS}
          component={EarnEventDetailsScreen}
          options={handleStackHeaderOption({ title: t('') })}
        />
        <Screen
          key={ROOT_STACK_ROUTE.DEEPLINK_CONNECT}
          name={ROOT_STACK_ROUTE.DEEPLINK_CONNECT}
          component={DeepLinkConnectProxy}
          options={{ headerShown: false }}
        />
        <Screen
          key={ROOT_STACK_ROUTE.EARN_EVENT_TRNASFERRING}
          name={ROOT_STACK_ROUTE.EARN_EVENT_TRNASFERRING}
          component={EarnEventTransferringScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Screen
          key={ROOT_STACK_ROUTE.EARN_EVENT_TRANSFER_SUCCESS}
          name={ROOT_STACK_ROUTE.EARN_EVENT_TRANSFER_SUCCESS}
          component={EarnEventTransferSuccessScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
      </Navigator>
      <LoadingIndicator />
      <PinModal />
      <TermsOfServicesModal />
      <PincodeGuideModal />
      <GlobalModal />
      <ToastPopup />
    </SafeAreaView>
  );
}

export default RootStack;
