import React from 'react';

import 'reflect-metadata';
/**
 * initializing DI modules, should be placed under reflect-metadata import statement
 */
import './di/di';
import '@@assets/locale/i18n';
import { useToggle } from '@@hooks/common/useToggle';
import Login from '@@screens/Login';
import Router from '@@screens/Router';
import PaperProvider from '@@style/PaperProvider';

import SecureKeychain from './utils/SecureKeychain';

function App(props: { foxCode?: string }) {
  SecureKeychain.init(props.foxCode || 'debug');

  const [isAuthenticated, toggle] = useToggle(false);

  if (!isAuthenticated) {
    return <Login login={toggle} />;
  }

  return (
    <PaperProvider>
      <Router />
    </PaperProvider>
  );
}

export default App;
