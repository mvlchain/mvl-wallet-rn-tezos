import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import BackButton from '@@components/BasicComponents/Header/BackButton';
import Setting from '@@screens/Setting';
import SettingAppVersion from '@@screens/Setting/SettingAppVersion';
import SettingDeleteAccount from '@@screens/Setting/SettingDeleteAccount';
import SettingFAQ from '@@screens/Setting/SettingFAQ';
import SettingPrivacyPolicy from '@@screens/Setting/SettingPrivacyPolicy';
import SettingSecurity from '@@screens/Setting/SettingSecurity';
import SettingPrivateKey from '@@screens/Setting/SettingSecurity/SettingDeleteAccount/SettingPrivateKey';
import SettingTermsOfService from '@@screens/Setting/SettingTermsOfService';
import { fontSize } from '@@utils/ui';

import { SETTING_STACK_ROUTE, TSettingStackParamList } from './SettingStack.type';

const { Navigator, Screen } = createNativeStackNavigator<TSettingStackParamList>();

type ScreenProps = Parameters<typeof Screen>[0];
function SettingStack() {
  // TODO: header 추가하기
  const { t } = useTranslation();
  const screens: Array<ScreenProps> = [
    {
      name: SETTING_STACK_ROUTE.SETTING_MAIN,
      component: Setting,
      options: {
        headerShown: false,
      },
    },
    {
      name: SETTING_STACK_ROUTE.SETTING_PRIVACY_POLITY,
      component: SettingPrivacyPolicy,
      options: {
        headerLeft: () => <BackButton />,
        title: t('privacy_policy'),
      },
    },
    {
      name: SETTING_STACK_ROUTE.SETTING_SECURITY,
      component: SettingSecurity,
      options: {
        headerLeft: () => <BackButton />,
        title: t('security'),
      },
    },
    {
      name: SETTING_STACK_ROUTE.SETTING_TERMS_OF_SERVICE,
      component: SettingTermsOfService,
      options: {
        headerLeft: () => <BackButton />,
        title: t('terms_of_service'),
      },
    },
    {
      name: SETTING_STACK_ROUTE.SETTING_DELETE_ACCOUNT,
      component: SettingDeleteAccount,
      options: {
        headerLeft: () => <BackButton />,
        title: t('delete_account'),
      },
    },
    {
      name: SETTING_STACK_ROUTE.SETTING_APP_VERSION,
      component: SettingAppVersion,
      options: {
        headerLeft: () => <BackButton />,
        title: '',
      },
    },
    {
      name: SETTING_STACK_ROUTE.SETTING_PRIVATE_KEY,
      component: SettingPrivateKey,
      options: {
        headerLeft: () => <BackButton />,
        title: t('private_key'),
      },
    },
    {
      name: SETTING_STACK_ROUTE.SETTING_FAQ,
      component: SettingFAQ,
      options: {
        headerLeft: () => <BackButton />,
        title: t('faq'),
      },
    },
  ];
  return (
    <Navigator
      screenOptions={() => ({
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: fontSize(20),
          fontFamily: 'AppleSDGothicNeoH00',
          fontWeight: '800',
        },
        headerShadowVisible: false,
      })}
    >
      {screens.map((props) => (
        <Screen key={props.name} {...props} />
      ))}
    </Navigator>
  );
}

export default SettingStack;
