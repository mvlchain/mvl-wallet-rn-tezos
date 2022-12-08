import {
  BASIC_USERNAME,
  BASIC_PASSWORD,
  AUTH_REDIRECT_URL,
  BROWSER_REDIRECT_URL,
  GOOGLE_CLIENT_ID,
  WEB3_AUTH_VERIFIER_GOOGLE,
  WEB3_AUTH_VERIFIER_APPLE,
  WEB3_AUTH_NETWORK,
  WEB3_AUTH_NATIVE_NETWORK,
  WEB3_AUTH_LOGGING,
} from '@env';

import { WalletAppConfig } from '@@config/appconfig.interface';
import { AUTH_PROVIDER } from '@@domain/auth/IAuthService';

const walletAppConfig: WalletAppConfig = {
  auth: {
    basic: {
      username: BASIC_USERNAME,
      password: BASIC_PASSWORD,
    },
    authRedirectUrl: AUTH_REDIRECT_URL,
    browserRedirectUrl: BROWSER_REDIRECT_URL,
    googleClientId: GOOGLE_CLIENT_ID,
    web3Auth: {
      verifier: {
        [AUTH_PROVIDER.GOOGLE]: WEB3_AUTH_VERIFIER_GOOGLE,
        [AUTH_PROVIDER.APPLE]: WEB3_AUTH_VERIFIER_APPLE,
      },
      network: WEB3_AUTH_NETWORK,
      nativeNetwork: WEB3_AUTH_NATIVE_NETWORK,
      logging: WEB3_AUTH_LOGGING === 'true',
    },
  },
};

export default (): WalletAppConfig => {
  if (!BASIC_USERNAME) {
    console.warn('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    console.warn('BASIC_USERNAME is not set! Please check your .env file');
    console.warn('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
  }
  return walletAppConfig;
};
