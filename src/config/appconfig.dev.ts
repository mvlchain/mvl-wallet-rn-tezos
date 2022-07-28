import { ClutchAppConfig } from '@@config/appconfig.interface';

const devConfig: ClutchAppConfig = {
  auth: {
    authRedirectUrl: '***REMOVED***',
    browserRedirectUrl: '***REMOVED***',
    googleClientId: '***REMOVED***',
    web3Auth: { verifier: '***REMOVED***', network: 'testnet' },
  },
};

export default (): ClutchAppConfig => devConfig;
