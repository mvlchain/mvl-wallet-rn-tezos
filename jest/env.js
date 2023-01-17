export const APP_ENV = 'dev';
export const BASIC_USERNAME = '***REMOVED***';
export const BASIC_PASSWORD = '***REMOVED***';
export const AUTH_REDIRECT_URL = '***REMOVED***';
export const BROWSER_REDIRECT_URL = '***REMOVED***';
export const GOOGLE_CLIENT_ID = '***REMOVED***';
export const WEB3_AUTH_VERIFIER_GOOGLE = '***REMOVED***';
export const WEB3_AUTH_VERIFIER_APPLE = '***REMOVED***';
export const WEB3_AUTH_NETWORK = 'mainnet';
export const WEB3_AUTH_NATIVE_NETWORK = 'mainnet';
export const WEB3_AUTH_LOGGING = 'true';
export const BASE_URL = '***REMOVED***';
export const BASE_NETWORK = 'testnet';

const mockEnv = {
  APP_ENV,
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
  BASE_URL,
  BASE_NETWORK,
};

export default {
  __esModule: true,
  default: mockEnv,
  ...mockEnv,
};
