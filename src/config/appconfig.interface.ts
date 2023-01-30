import { AuthProvider } from '@@domain/auth/IAuthService';

type BaseNetworkType = 'testnet' | 'mainnet';

export interface WalletAppConfig {
  baseUrl: string;
  baseNetwork: BaseNetworkType;
  auth: AuthConfig;
  sentry: {
    dsn: string;
    environment: string;
  };
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
    network: BaseNetworkType;
    nativeNetwork: 'ropsten' | 'mainnet';
    logging: boolean;
  };
}
