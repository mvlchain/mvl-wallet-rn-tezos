import {
  AUTH_REDIRECT_URL,
  BASE_NETWORK,
  BASE_URL,
  BASIC_PASSWORD,
  BASIC_USERNAME,
  BROWSER_REDIRECT_URL,
  GOOGLE_CLIENT_ID,
  WEB3_AUTH_LOGGING,
  WEB3_AUTH_NATIVE_NETWORK,
  WEB3_AUTH_NETWORK,
  WEB3_AUTH_VERIFIER_APPLE,
  WEB3_AUTH_VERIFIER_GOOGLE,
  SENTRY_DSN,
  SENTRY_ENVIRONMENT,
} from '@env';

import { WalletAppConfig } from '@@config/appconfig.interface';
import { AUTH_PROVIDER } from '@@domain/auth/IAuthService';

const walletAppConfig: WalletAppConfig = {
  baseUrl: BASE_URL,
  baseNetwork: BASE_NETWORK,
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
  sentry: {
    dsn: SENTRY_DSN,
    environment: SENTRY_ENVIRONMENT,
  },
};

export default (): WalletAppConfig => {
  if (!BASE_URL) {
    console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\nBASIC_USERNAME is not set! Please check your .env file\n!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
  }
  return walletAppConfig;
};
