export const APP_ENV = 'dev';
export const BASIC_USERNAME = '';
export const BASIC_PASSWORD = '';
export const AUTH_REDIRECT_URL = '';
export const BROWSER_REDIRECT_URL = '';
export const GOOGLE_CLIENT_ID = '';
export const WEB3_AUTH_VERIFIER_GOOGLE = '';
export const WEB3_AUTH_VERIFIER_APPLE = '';
export const WEB3_AUTH_NETWORK = '';
export const WEB3_AUTH_NATIVE_NETWORK = '';
export const WEB3_AUTH_LOGGING = '';
export const BASE_URL = 'BASE_URL';
export const BASE_NETWORK = '';
export const INFURA_ID = '';
export const ETH_RPC_URL = '';
export const GOERLI_RPC_URL = '';
export const BSC_RPC_URL = '';
export const BSC_TESTNET_RPC_URL = '';
export const TEZOS_RPC_URL = '';
export const TEZOS_GHOSTNET_RPC_URL = '';
export const SENTRY_DSN = '';
export const SENTRY_ENVIRONMENT = '';
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
  INFURA_ID,
  ETH_RPC_URL,
  GOERLI_RPC_URL,
  BSC_RPC_URL,
  BSC_TESTNET_RPC_URL,
  TEZOS_RPC_URL,
  TEZOS_GHOSTNET_RPC_URL,
  SENTRY_DSN,
  SENTRY_ENVIRONMENT,
};

export default {
  __esModule: true,
  default: mockEnv,
  ...mockEnv,
};
