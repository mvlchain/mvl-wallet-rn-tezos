import { ShareStore } from '@tkey/common-types';

import { AuthProvider, DeviceShareHolder } from '@@domain/auth/IAuthService';

export interface DeviceShareRepository {
  checkDeviceShare: () => Promise<boolean>;
  fetchDeviceShare: () => Promise<DeviceShareHolder>;
  saveDeviceShare: (
    postboxKey: string,
    deviceShare: ShareStore,
    password: string,
    provider: AuthProvider,
    idToken?: string,
    accessToken?: string
  ) => Promise<void>;
  clearDeviceShare: () => void;
  comparePostboxKeyInDeviceShare: (postboxkey: string) => Promise<{ compareResult: boolean; deviceShare: ShareStore }>;
}
