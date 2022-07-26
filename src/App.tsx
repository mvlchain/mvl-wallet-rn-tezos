import React from 'react';
import 'reflect-metadata';

import { useToggle } from '@@hooks/useToggle';
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
