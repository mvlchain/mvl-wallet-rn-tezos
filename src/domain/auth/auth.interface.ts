import { ShareStore } from '@tkey/common-types';

export const AUTH_PROVIDER = {
  GOOGLE: 'GOOGLE',
  APPLE: 'APPLE',
};

export type AuthProvider = typeof AUTH_PROVIDER[keyof typeof AUTH_PROVIDER];

export type RequirePassword = () => Promise<string>;

export type ProviderToken = {
  idToken?: string;
  accessToken?: string;
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

export default interface IAuthService {
  // best effort to get private key
  signIn(provider: AuthProvider, requirePassword: RequirePassword): Promise<string>;
  logout(): Promise<void>;
  test(): Promise<void>;
  deleteAccount(): Promise<void>;
}
