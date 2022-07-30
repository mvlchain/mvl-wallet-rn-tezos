import { ClutchAppConfig } from '@@config/appconfig.interface';
import { AUTH_PROVIDER } from '@@domain/auth/auth.interface';

const devConfig: ClutchAppConfig = {
  auth: {
    basic: {
      username: '***REMOVED***',
      password: '***REMOVED***',
    },
    authRedirectUrl: '***REMOVED***',
    browserRedirectUrl: '***REMOVED***',
    googleClientId: '***REMOVED***',
    web3Auth: {
      verifier: {
        [AUTH_PROVIDER.GOOGLE]: '***REMOVED***',
        [AUTH_PROVIDER.APPLE]: '***REMOVED***',
      },
      network: 'testnet',
    },
  },
};

export default (): ClutchAppConfig => devConfig;
