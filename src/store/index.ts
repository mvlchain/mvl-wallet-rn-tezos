import FilesystemStorage from 'redux-persist-filesystem-storage';
import createStore from 'zustand';
import { persist } from 'zustand/middleware';

import createMigrate from './createMigration';
import { version, migrations } from './migrations';

const useStore = createStore(
  persist<{ isAuthenticated: boolean; toggle: () => void }>(
    (set) => ({
      isAuthenticated: false,
      toggle: () => set((state) => ({ isAuthenticated: !state.isAuthenticated })),
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
