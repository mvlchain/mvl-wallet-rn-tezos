import { AuthProvider } from '@@domain/auth/auth.interface';

export interface ClutchAppConfig {
  auth: AuthConfig;
}

export interface AuthConfig {
  authRedirectUrl: string;
  browserRedirectUrl: string;
  googleClientId: string;
  web3Auth: {
    verifier: {
      [key in AuthProvider]: string;
    };
    network: 'testnet' | 'mainnet';
  };
}
