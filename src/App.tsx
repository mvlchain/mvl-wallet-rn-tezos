import React, { useEffect } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ErrorBoundary from 'react-native-error-boundary';
import { ThemeProvider } from 'styled-components/native';
import 'reflect-metadata';
/**
 * initializing DI modules, should be placed under reflect-metadata import statement
 */
import './di/di';
import '@@assets/locale/i18n';
import useApp from 'useApp';

import RootStack from '@@navigation/RootStack';
import ErrorBoundaryScreen from '@@screens/ErrorBoundaryScreen';
import { theme } from '@@style/theme';
import SecureKeychain from '@@utils/SecureKeychain';

import SplashScreen from 'react-native-splash-screen';
const queryClient = new QueryClient();

function App(props: { foxCode?: string }) {
  SecureKeychain.init(props.foxCode || 'debug');
  const { appTheme } = useApp();

  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <ErrorBoundary FallbackComponent={ErrorBoundaryScreen}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme[appTheme.label]}>
          <RootStack />
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
