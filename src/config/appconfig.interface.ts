import { AuthProvider } from '@@domain/auth/IAuthService';

export interface ClutchAppConfig {
  auth: AuthConfig;
}

export interface AuthConfig {
  basic: {
    username: string;
    password: string;
  };
  authRedirectUrl: string;
  browserRedirectUrl: string;
  googleClientId: string;
  web3Auth: {
    verifier: {
      [key in AuthProvider]: string;
    };
    network: 'testnet' | 'mainnet';
    nativeNetwork: 'ropsten' | 'mainnet';
  };
}
