import { ShareStore } from '@tkey/common-types';

export const AUTH_PROVIDER = {
  GOOGLE: 'GOOGLE',
  APPLE: 'APPLE',
};

export type AuthProvider = typeof AUTH_PROVIDER[keyof typeof AUTH_PROVIDER];

export default interface IAuthService {
  // best effort to get private key
  signIn(provider: AuthProvider, requirePassword: () => Promise<string>): Promise<string>;
}

export class DeviceShareHolder {
  readonly postboxKey: string;
  readonly share: ShareStore;
  readonly polynomialId: string;
  readonly idToken: string;

  constructor(postboxKey: string, share: ShareStore, polynomialId: string, idToken: string) {
    this.postboxKey = postboxKey;
    this.share = share;
    this.polynomialId = polynomialId;
    this.idToken = idToken;
  }
}
