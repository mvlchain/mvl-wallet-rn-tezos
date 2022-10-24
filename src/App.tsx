import React from 'react';

import ErrorBoundary from 'react-native-error-boundary';
import { ThemeProvider } from 'styled-components';
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

import SecureKeychain from './utils/SecureKeychain';

function App(props: { foxCode?: string }) {
  SecureKeychain.init(props.foxCode || 'debug');
  const { appTheme } = useApp();
  return (
    <ErrorBoundary FallbackComponent={ErrorBoundaryScreen}>
      <ThemeProvider theme={theme[appTheme.label]}>
        <RootStack />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
