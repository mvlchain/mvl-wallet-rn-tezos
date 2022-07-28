export interface ClutchAppConfig {
  auth: AuthConfig;
}

export interface AuthConfig {
  authRedirectUrl: string;
  browserRedirectUrl: string;
  googleClientId: string;
  web3Auth: {
    verifier: string;
    network: 'testnet' | 'mainnet';
  };
}
