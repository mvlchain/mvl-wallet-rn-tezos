import './shim';
import * as Sentry from '@sentry/react-native';
import Decimal from 'decimal.js';
import { AppRegistry, Alert } from 'react-native';
import { setJSExceptionHandler } from 'react-native-exception-handler';

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

Sentry.init({
  dsn: '***REMOVED***',
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: __DEV__ ? 1.0 : 0.1,
  environment: __DEV__ ? 'staging' : 'production',
});

const errorHandler = (error) => {
  // You don't need to log error here because `setJSExceptionHandler` will use console.error in it.
  const sentryEventId = Sentry.captureException(error);
  if (__DEV__) {
    console.log(`sent sentryEventId: ${sentryEventId}`);
    return;
  }
  Alert.alert('Unexpected Error', error.message);
};

setJSExceptionHandler(errorHandler, true);

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
