// Don't forget to update mock env file at jest/env.js too.

declare module '@env' {
  export const BASIC_USERNAME: string;
  export const BASIC_PASSWORD: string;
  export const AUTH_REDIRECT_URL: string;
  export const BROWSER_REDIRECT_URL: string;
  export const GOOGLE_CLIENT_ID: string;
  export const WEB3_AUTH_VERIFIER_GOOGLE: string;
  export const WEB3_AUTH_VERIFIER_APPLE: string;
  export const WEB3_AUTH_NETWORK: 'testnet' | 'mainnet';
  export const WEB3_AUTH_NATIVE_NETWORK: 'ropsten' | 'mainnet';
  export const WEB3_AUTH_LOGGING: string;
}
