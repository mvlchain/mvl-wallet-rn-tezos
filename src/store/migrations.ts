import { MigrationManifest } from './types';

export const migrations: MigrationManifest = {
  // [version: number]: (persistedState: S, version: number) => S | Promise<S>;
};

export const version = 0;
