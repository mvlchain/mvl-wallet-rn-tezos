import { AppRegistry } from 'react-native';

import { name as appName } from './app.json';
import App from './src/App';

global.Buffer = global.Buffer || require('buffer').Buffer;

AppRegistry.registerComponent(appName, () => App);
