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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ErrorBoundary from 'react-native-error-boundary';
import { ThemeProvider } from 'styled-components';
import useApp from 'useApp';

import { useSplashScreenTransition } from '@@hooks/useSplashScreenTransition';
import { DeepLinkOptions } from '@@navigation/DeepLinkOptions';
import RootStack from '@@navigation/RootStack';
import { navigationRef } from '@@navigation/RootStack/RootNavigation';
import ErrorBoundaryScreen from '@@screens/ErrorBoundaryScreen';
import { theme } from '@@style/theme';
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

  const { appTheme } = useApp();
  useSplashScreenTransition();

  return (
    <ErrorBoundary FallbackComponent={ErrorBoundaryScreen}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme[appTheme.value]}>
          <NavigationContainer ref={navigationRef} theme={ROUTER_THEME} linking={DeepLinkOptions}>
            <RootStack />
          </NavigationContainer>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
