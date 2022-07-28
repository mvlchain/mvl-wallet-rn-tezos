import FilesystemStorage from 'redux-persist-filesystem-storage';
import createStore from 'zustand';
import { persist } from 'zustand/middleware';

import createMigrate from './createMigration';
import { migrations, version } from './migrations';

export class DeviceShareHolderDto {
  readonly postboxKeyJsonEncrypted: string;
  readonly shareJsonEncrypted: string;
  readonly polynomialId: string;
  readonly idTokenJsonEncrypted: string;

  constructor(postboxKeyJsonEncrypted: string, shareJsonEncrypted: string, polynomialId: string, idTokenJsonEncrypted: string) {
    this.postboxKeyJsonEncrypted = postboxKeyJsonEncrypted;
    this.shareJsonEncrypted = shareJsonEncrypted;
    this.polynomialId = polynomialId;
    this.idTokenJsonEncrypted = idTokenJsonEncrypted;
  }
}

const useStore = createStore(
  persist<{ isAuthenticated: boolean; toggle: () => void; deviceShare?: DeviceShareHolderDto }>(
    (set) => ({
      isAuthenticated: false,
      toggle: () => set((state) => ({ isAuthenticated: !state.isAuthenticated })),
      deviceShare: undefined,
    }),
    {
      name: 'root',
      getStorage: () => ({
        setItem: (key, value) => FilesystemStorage.setItem(key, value),
        getItem: (key) => FilesystemStorage.getItem(key).then((data) => data ?? null),
        removeItem: (key) => FilesystemStorage.removeItem(key),
      }),
      version,
      migrate: createMigrate(migrations),
    },
  ),
);

export default useStore;
