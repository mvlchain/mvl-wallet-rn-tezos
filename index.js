import './shim';

import { AppRegistry } from 'react-native';

import appconfig from '@@config/appconfig';
import { setAxiosConfig } from '@@utils/request';

import { name as appName } from './app.json';
import App from './src/App';

(() => {
  const { username, password } = appconfig().auth.basic;
  const basicCredential = `${username}:${password}`;
  const encoded = new Buffer(basicCredential, 'utf8').toString('base64');

  setAxiosConfig({
    baseURL: '***REMOVED***',
    headers: {
      Authorization: `Basic ${encoded}`,
    },
  });
})();

AppRegistry.registerComponent(appName, () => App);
