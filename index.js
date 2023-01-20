import './shim';
import Decimal from 'decimal.js';
import { AppRegistry } from 'react-native';

import ControllerManager from '@@components/BasicComponents/Modals/RPCMethodsModal/controllerManager';
import appconfig from '@@config/appconfig';
import EntryScriptWeb3 from '@@utils/BackgroundBridge/EntryScriptWeb3';
import { setLogConfigs } from '@@utils/Logger';
import { setAxiosConfig } from '@@utils/request';

import { name as appName } from './app.json';
import App from './src/App';

if (__DEV__) {
  import('./src/ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

Decimal.set({ precision: 1e9, toExpPos: 9e15 });

const {
  baseUrl,
  auth: {
    basic: { username, password },
  },
} = appconfig();

const basicCredential = `${username}:${password}`;
const encoded = new Buffer(basicCredential, 'utf8').toString('base64');

setAxiosConfig({
  baseURL: baseUrl,
  headers: {
    Authorization: `Basic ${encoded}`,
  },
});
setLogConfigs([]);

ControllerManager.init();
EntryScriptWeb3.init();

AppRegistry.registerComponent(appName, () => App);
