import AsyncStorage from '@react-native-async-storage/async-storage';
import FilesystemStorage from 'redux-persist-filesystem-storage';
import create from 'zustand';
import { persist, devtools } from 'zustand/middleware';

import createMigrate from './createMigration';
import { migrations, version } from './migrations';

export class DeviceShareHolderDto {
  readonly postboxKeyJsonEncrypted: string;
  readonly shareJsonEncrypted: string;
  readonly polynomialId: string;
  readonly providerTokenJsonEncrypted: string;

  constructor(postboxKeyJsonEncrypted: string, shareJsonEncrypted: string, polynomialId: string, providerTokenJsonEncrypted: string) {
    this.postboxKeyJsonEncrypted = postboxKeyJsonEncrypted;
    this.shareJsonEncrypted = shareJsonEncrypted;
    this.polynomialId = polynomialId;
    this.providerTokenJsonEncrypted = providerTokenJsonEncrypted;
  }
}

type stateType = {
  isAuthenticated: boolean;
  deviceShare?: DeviceShareHolderDto;
  toggle: () => void;
};

const useStore = create<stateType>()(
  devtools(
    persist(
      (set) => ({
        isAuthenticated: false,
        deviceShare: undefined,
        toggle: () => set((state) => ({ isAuthenticated: !state.isAuthenticated }), false, 'toggle'),
      }),
      {
        name: 'root',
        getStorage: () => AsyncStorage,
      }
    )
  )
);

export default useStore;
