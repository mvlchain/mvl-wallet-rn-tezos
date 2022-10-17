import React, { useState } from 'react';

import 'reflect-metadata';
/**
 * initializing DI modules, should be placed under reflect-metadata import statement
 */
import './di/di';
import '@@assets/locale/i18n';
import RootStack from 'navigation/RootStack';
import { ThemeProvider } from 'styled-components';

import { theme } from '@@style/theme';

import SecureKeychain from './utils/SecureKeychain';

function App(props: { foxCode?: string }) {
  SecureKeychain.init(props.foxCode || 'debug');
  const [myTheme, setMyTheme] = useState<'dark' | 'light'>('light');

  return (
    <ThemeProvider theme={theme[myTheme]}>
      <RootStack />
    </ThemeProvider>
  );
}

export default App;
