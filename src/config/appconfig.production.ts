import { ClutchAppConfig } from '@@config/appconfig.interface';

const productionConfig: ClutchAppConfig = {
  auth: {
    authRedirectUrl: '***REMOVED***',
    browserRedirectUrl: '***REMOVED***',
    googleClientId: '***REMOVED***',
    web3Auth: { verifier: '***REMOVED***', network: 'testnet' },
  },
};

export default (): ClutchAppConfig => productionConfig;
