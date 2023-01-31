import { ReconstructedKeyResult } from '@tkey/common-types';
import ShareStore from '@tkey/common-types/src/base/ShareStore';
import ThresholdKey from '@tkey/core';

import { AuthProvider } from '@@domain/auth/constants/constants';
interface GenerateShareResDTO {
  share: ShareStore;
  index: string;
}
export interface TorusShareRepository {
  tKey: ThresholdKey | null;
  getTorusKey: () => Promise<ThresholdKey | null>;
  init: (postboxKey: string, onlySignIn: boolean) => Promise<ThresholdKey>;
  initOverride: (postboxKey: string, mnemonic?: string) => Promise<ThresholdKey>;
  assembleShares: (share?: ShareStore) => Promise<ReconstructedKeyResult>;
  generateAdditionalShare: () => Promise<GenerateShareResDTO>;
  getPrivateKey: () => string;
  findUknownShareByKnown: (share: ShareStore) => Promise<ShareStore>;
  countTotalSharesInGroupOf: (share: ShareStore) => number;
  delete: (postboxKey: string) => Promise<void>;
  print: () => void;
  checkSignedUp: (postboxKey: string) => Promise<boolean>;
  triggerSocialByTorusCustomAuth: (
    provider: AuthProvider
  ) => Promise<{ postboxKey: string; providerIdToken?: string; providerAccessToken?: string; providerUserIdentifier?: string }>;
}
