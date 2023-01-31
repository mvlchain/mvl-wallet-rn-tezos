import ThresholdKey from '@tkey/core';

import { AuthProvider } from '@@domain/auth/IAuthService';
import {
  ClutchUserResponseDto,
  RestoreAccountDto,
  ShareResponseDto,
  SignupDto,
  SimpleResponseDto,
  UpdateServerShareDto,
} from '@@generated/generated-scheme';

export interface ServerShareRepository {
  findServerShare: (
    tKey: ThresholdKey,
    provider: AuthProvider,
    providerIdToken?: string,
    providerAccessToken?: string
  ) => Promise<ShareResponseDto | undefined>;
  fetchServerShare: (provider: AuthProvider, polynomialId: string, idToken?: string, accessToken?: string) => Promise<ShareResponseDto | undefined>;
  updateServerShare: (share: string, shareIndex: string, polynomialID: string, deviceShareIndex?: string) => Promise<ShareResponseDto | undefined>;
  saveServerShare: (body: SignupDto) => Promise<ClutchUserResponseDto>;
  restoreServerShare: (body: RestoreAccountDto) => Promise<SimpleResponseDto>;
  deleteServerShare: () => void;
}
