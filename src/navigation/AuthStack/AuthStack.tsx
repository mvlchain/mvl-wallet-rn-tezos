import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native';

import { ToastPopup } from '@@components/BasicComponents/Modals/BaseModal/ToastPopup';
import useHeader from '@@hooks/useHeader';
import { useColor } from '@@hooks/useTheme';
import ConfirmSeedPhraseScreen from '@@screens/Mnemonic/ConfirmSeedPhraseScreen';
import SeedPhraseScreen from '@@screens/Mnemonic/SeedPhraseScreen';
import SignInScreen from '@@screens/SignInScreen';
import { fontSize, height } from '@@utils/ui';

import { AUTH_STACK_ROUTE, TAuthStackParamList } from './AuthStack.type';

const { Navigator, Screen } = createStackNavigator<TAuthStackParamList>();

function AuthStack() {
  const { color } = useColor();
  const { handleStackHeaderOption } = useHeader();
  const { t } = useTranslation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
      <ToastPopup />
    </SafeAreaView>
  );
}

export default AuthStack;
