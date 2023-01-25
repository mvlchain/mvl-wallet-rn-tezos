import React, { useCallback } from 'react';

import 'react-native-get-random-values';
import '@ethersproject/shims';
import 'reflect-metadata';
/**
 * initializing DI modules, should be placed under reflect-metadata import statement
 */
import './di/di';
import '@@assets/locale/i18n';
import { DefaultTheme, NavigationContainer, NavigationState } from '@react-navigation/native';
import * as Sentry from '@sentry/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ErrorBoundary from 'react-native-error-boundary';
import { ThemeProvider } from 'styled-components';
import useApp from 'useApp';

import ErrorScreenEmpty from '@@components/BasicComponents/ErrorBoundary/ErrorScreenEmpty';
import PinModal from '@@components/BasicComponents/Modals/Auth/PinModal';
import PincodeGuideModal from '@@components/BasicComponents/Modals/Auth/PincodeGuideModal';
import TermsOfServicesModal from '@@components/BasicComponents/Modals/Auth/TermsOfServicesModal';
import RootRPCMethodsUI from '@@components/BasicComponents/Modals/RPCMethodsModal/RootRPCMethodsUI';
import { useInitialUrl } from '@@hooks/useInitialUrl';
import { useSplashScreenTransition } from '@@hooks/useSplashScreenTransition';
import AuthStack from '@@navigation/AuthStack';
import { DeepLinkOptions } from '@@navigation/DeepLinkOptions';
import RootStack from '@@navigation/RootStack';
import { navigationRef } from '@@navigation/RootStack/RootNavigation';
import authStore from '@@store/auth/authStore';
import { AppScreen } from '@@store/auth/authStore.type';
import { theme } from '@@style/theme';
import { tagLogger } from '@@utils/Logger';
import SecureKeychain from '@@utils/SecureKeychain';

const queryClient = new QueryClient();

const ROUTER_THEME = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
  },
};

function App(props: { foxCode?: string }) {
  SecureKeychain.init(props.foxCode || 'debug');
  /**
   * Set up LogTag filters to display logs in console
   */
  const appLogger = tagLogger('App');

  const { appTheme } = useApp();
  useSplashScreenTransition();
  const { isSignedIn, appScreen } = authStore();
  useInitialUrl();
  const onNavigationStateChange = useCallback((state: NavigationState | undefined) => {
    if (state) {
      console.log(`Screen> current screen: ${state.routeNames[state.index]}, index; ${state.index}`);
    }
  }, []);

  appLogger.log(`isSignedIn: ${isSignedIn} appScreen: ${appScreen}`);

  /**
   * TODO: 추후 인증과 관련된 모듈들은 AuthStack에서 관리하도록 리팩터링하는게 좋을 듯하다.
   *  - TermsOfService
   *  - PinCodeGuide
   *  - PinCodeSetup
   *  - SeedPhrase
   */
  return (
    <ThemeProvider theme={theme[appTheme.value]}>
      <ErrorBoundary FallbackComponent={ErrorScreenEmpty}>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer ref={navigationRef} theme={ROUTER_THEME} linking={DeepLinkOptions} onStateChange={onNavigationStateChange}>
            {!isSignedIn || appScreen === AppScreen.Auth ? <AuthStack /> : <RootStack />}
            <PinModal />
            <TermsOfServicesModal />
            <PincodeGuideModal />
            <RootRPCMethodsUI />
          </NavigationContainer>
        </QueryClientProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default Sentry.wrap(App);
