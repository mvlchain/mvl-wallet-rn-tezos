import React from 'react';
import 'reflect-metadata';
/**
 * initializing DI modules, should be placed under reflect-metadata import statement
 */
import './di/di';

import RootStack from 'navigation/RootStack';

import { useToggle } from '@@hooks/common/useToggle';

import SecureKeychain from './utils/SecureKeychain';

function App(props: { foxCode?: string }) {
  SecureKeychain.init(props.foxCode || 'debug');

  return <RootStack />;
}

export default App;
