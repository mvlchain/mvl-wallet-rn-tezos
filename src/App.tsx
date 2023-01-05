import React from 'react';

import 'react-native-get-random-values';
import '@ethersproject/shims';
import 'reflect-metadata';
/**
 * initializing DI modules, should be placed under reflect-metadata import statement
 */
import './di/di';
import '@@assets/locale/i18n';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { APP_STACK_ROUTE, TAppStackParamList } from 'App.type';
import { useTranslation } from 'react-i18next';
import ErrorBoundary from 'react-native-error-boundary';
import { ThemeProvider } from 'styled-components';
import useApp from 'useApp';

import PinModal from '@@components/BasicComponents/Modals/Auth/PinModal';
import PincodeGuideModal from '@@components/BasicComponents/Modals/Auth/PincodeGuideModal';
import TermsOfServicesModal from '@@components/BasicComponents/Modals/Auth/TermsOfServicesModal';
import useHeader from '@@hooks/useHeader';
import { useSplashScreenTransition } from '@@hooks/useSplashScreenTransition';
import AuthStack from '@@navigation/AuthStack';
import { DeepLinkOptions } from '@@navigation/DeepLinkOptions';
import RootStack from '@@navigation/RootStack';
import { navigationRef } from '@@navigation/RootStack/RootNavigation';
import ErrorBoundaryScreen from '@@screens/ErrorBoundaryScreen';
import ConfirmSeedPhraseScreen from '@@screens/Mnemonic/ConfirmSeedPhraseScreen';
import SeedPhraseScreen from '@@screens/Mnemonic/SeedPhraseScreen';
import SignInScreen from '@@screens/SignInScreen';
import authStore from '@@store/auth/authStore';
import { theme } from '@@style/theme';
import SecureKeychain from '@@utils/SecureKeychain';
import { AppScreen } from '@@store/auth/authStore.type';

const queryClient = new QueryClient();

const ROUTER_THEME = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
  },
};

const { Navigator, Screen } = createStackNavigator<TAppStackParamList>();

function App(props: { foxCode?: string }) {
  SecureKeychain.init(props.foxCode || 'debug');

  const { appTheme } = useApp();
  const { t } = useTranslation();
  const { handleStackHeaderOption } = useHeader();
  useSplashScreenTransition();
  const { isSignedIn, appScreen } = authStore();

  console.log(`isSignedIn: ${isSignedIn} appScreen: ${appScreen}`);

  /**
   * TODO: 추후 인증과 관련된 모듈들은 AuthStack에서 관리하도록 리팩터링하는게 좋을 듯하다.
   *  - TermsOfService
   *  - PinCodeGuide
   *  - PinCodeSetup
   *  - SeedPhrase
   */
  return (
    <ErrorBoundary FallbackComponent={ErrorBoundaryScreen}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme[appTheme.value]}>
          <NavigationContainer ref={navigationRef} theme={ROUTER_THEME} linking={DeepLinkOptions}>
            {/* {(!isSignedIn && appScreen === AppScreen.Auth) ? <SignInScreen /> : <RootStack />} */}
            {!isSignedIn || appScreen === AppScreen.Auth ? (
              <Navigator
                initialRouteName={APP_STACK_ROUTE.AUTH}
                screenOptions={() => ({
                  headerShown: false,
                })}
              >
                <Screen key={APP_STACK_ROUTE.AUTH} name={APP_STACK_ROUTE.AUTH} component={SignInScreen} />
                <Screen key={APP_STACK_ROUTE.SEED_PHRASE} name={APP_STACK_ROUTE.SEED_PHRASE} component={SeedPhraseScreen} />
                <Screen
                  key={APP_STACK_ROUTE.SEED_PHRASE_CONFIRM}
                  name={APP_STACK_ROUTE.SEED_PHRASE_CONFIRM}
                  component={ConfirmSeedPhraseScreen}
                  options={handleStackHeaderOption({ title: t('confirm_seed_phrase_lbl_title') })}
                />
                {/* <Screen key={APP_STACK_ROUTE.ROOT} name={APP_STACK_ROUTE.ROOT} component={RootStack} /> */}
              </Navigator>
            ) : (
              <RootStack />
            )}

            <PinModal />
            <TermsOfServicesModal />
            <PincodeGuideModal />
          </NavigationContainer>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
