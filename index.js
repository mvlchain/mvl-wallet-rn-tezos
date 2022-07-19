import './shim';

import { AppRegistry } from 'react-native';

import { name as appName } from './app.json';
import App from './src/App';
import { setAxiosConfig } from './src/utils/request';

setAxiosConfig({
  baseURL: '***REMOVED***',
  headers: {
    Authorization: 'Basic bXZsLWNsdXRjaC0yYTg5ZDJlNGYxZGRhOGQ4OndhbGxldC1zZWNyZXQtMzMwYmM4ODVmNDA5NmE0MQ==',
  },
});

AppRegistry.registerComponent(appName, () => App);
