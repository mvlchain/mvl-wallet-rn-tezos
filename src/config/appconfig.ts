import devConfig from './appconfig.dev';
import productionConfig from './appconfig.production';

let activeConfig = devConfig;
if (process.env.NODE_ENV === 'production') {
  activeConfig = productionConfig;
}

export default activeConfig;
