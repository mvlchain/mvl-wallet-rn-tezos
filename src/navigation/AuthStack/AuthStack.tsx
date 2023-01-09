import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';

import PinModal from '@@components/BasicComponents/Modals/Auth/PinModal';
import PincodeGuideModal from '@@components/BasicComponents/Modals/Auth/PincodeGuideModal';
import TermsOfServicesModal from '@@components/BasicComponents/Modals/Auth/TermsOfServicesModal';
import useHeader from '@@hooks/useHeader';
import { useColor } from '@@hooks/useTheme';
import { DeepLinkOptions } from '@@navigation/DeepLinkOptions';
import RootStack from '@@navigation/RootStack';
import { navigationRef } from '@@navigation/RootStack/RootNavigation';
import ErrorBoundaryScreen from '@@screens/ErrorBoundaryScreen';
import ConfirmSeedPhraseScreen from '@@screens/Mnemonic/ConfirmSeedPhraseScreen';
import SeedPhraseScreen from '@@screens/Mnemonic/SeedPhraseScreen';
import SignInScreen from '@@screens/SignInScreen';
import authStore from '@@store/auth/authStore';
import { AppScreen } from '@@store/auth/authStore.type';
import { theme } from '@@style/theme';
import SecureKeychain from '@@utils/SecureKeychain';
import { fontSize, height } from '@@utils/ui';

import { AUTH_STACK_ROUTE, TAuthStackParamList } from './AuthStack.type';

const { Navigator, Screen } = createStackNavigator<TAuthStackParamList>();

function AuthStack() {
  const { color } = useColor();
  const { handleStackHeaderOption } = useHeader();
  const { t } = useTranslation();

  return (
    <Navigator
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
      <Screen key={AUTH_STACK_ROUTE.SIGN_IN} name={AUTH_STACK_ROUTE.SIGN_IN} component={SignInScreen} options={() => ({ headerShown: false })} />
      <Screen key={AUTH_STACK_ROUTE.SEED_PHRASE} name={AUTH_STACK_ROUTE.SEED_PHRASE} component={SeedPhraseScreen} />
      <Screen
        key={AUTH_STACK_ROUTE.SEED_PHRASE_CONFIRM}
        name={AUTH_STACK_ROUTE.SEED_PHRASE_CONFIRM}
        component={ConfirmSeedPhraseScreen}
        options={handleStackHeaderOption({ title: t('confirm_seed_phrase_lbl_title') })}
      />
    </Navigator>
  );
}

export default AuthStack;
