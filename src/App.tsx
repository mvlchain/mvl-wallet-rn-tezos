import React, { useEffect, useState } from 'react';

import { Appearance } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ErrorBoundary from 'react-native-error-boundary';
import SplashScreen from 'react-native-splash-screen';
import { ThemeProvider } from 'styled-components';
import 'reflect-metadata';
/**
 * initializing DI modules, should be placed under reflect-metadata import statement
 */
import './di/di';
import '@@assets/locale/i18n';
import useApp from 'useApp';

import { THEME } from '@@constants/setting.constant';
import RootStack from '@@navigation/RootStack';
import ErrorBoundaryScreen from '@@screens/ErrorBoundaryScreen';
import settingStore from '@@store/setting/settingPersistStore';
import { theme } from '@@style/theme';
import SecureKeychain from '@@utils/SecureKeychain';

import SplashScreen from 'react-native-splash-screen';
const queryClient = new QueryClient();

function App(props: { foxCode?: string }) {
  SecureKeychain.init(props.foxCode || 'debug');
  //const { appTheme } = useApp();
  const { appTheme, setAppTheme } = settingStore();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  // listen to theme change events
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (appTheme.value === THEME.DEFAULT) {
        const theme = Appearance.getColorScheme() ?? 'light';
        setAppTheme({
          value: THEME.DEFAULT,
          label: theme,
        });
      } else if (appTheme.value === THEME.LIGHT) {
        setAppTheme({
          value: THEME.LIGHT,
          label: THEME.LIGHT,
        });
      } else if (appTheme.value === THEME.DARK) {
        setAppTheme({
          value: THEME.DARK,
          label: THEME.DARK,
        });
      }
    });
    return () => {
      subscription.remove();
    };
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
