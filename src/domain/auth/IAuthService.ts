import { ShareStore } from '@tkey/common-types';

export interface AuthService {
  autoSignIn: () => Promise<string | null>;
  signIn: (provider: AuthProvider) => Promise<SignInCredential>;
  signUp: (pincode: string) => Promise<string>;
  signOut: () => Promise<void>;
  deleteAccount: () => Promise<void>;
  resetPin: () => Promise<string | undefined>;
  resetPinOnScreen: () => Promise<(input: string) => Promise<void> | undefined>;
  getMnemonicByPkey: () => string;
}
export const AUTH_PROVIDER = {
  GOOGLE: 'GOOGLE',
  APPLE: 'APPLE',
} as const;

export type AuthProvider = typeof AUTH_PROVIDER[keyof typeof AUTH_PROVIDER];

export type RequirePassword = () => Promise<string>;

export type ProviderToken = {
  idToken?: string;
  accessToken?: string;
  provider: AuthProvider;
};

export type SignInCredential = {
  privateKey: string;
  isNewUser?: boolean;
};

export class DeviceShareHolder {
  readonly postboxKey: string;
  readonly share: ShareStore;
  readonly polynomialId: string;
  readonly providerToken: ProviderToken;

  constructor(postboxKey: string, share: ShareStore, polynomialId: string, providerToken: ProviderToken) {
    this.postboxKey = postboxKey;
    this.share = share;
    this.polynomialId = polynomialId;
    this.providerToken = providerToken;
  }
}
