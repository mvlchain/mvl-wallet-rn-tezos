import React from 'react';

import { ThemeProvider } from 'styled-components';
import 'reflect-metadata';
/**
 * initializing DI modules, should be placed under reflect-metadata import statement
 */
import './di/di';
import '@@assets/locale/i18n';

import useApp from 'useApp';

import RootStack from '@@navigation/RootStack';
import { theme } from '@@style/theme';

import SecureKeychain from './utils/SecureKeychain';

function App(props: { foxCode?: string }) {
  SecureKeychain.init(props.foxCode || 'debug');
  const { myTheme } = useApp();
  return (
    <ThemeProvider theme={theme[myTheme]}>
      <RootStack />
    </ThemeProvider>
  );
}

export default App;
