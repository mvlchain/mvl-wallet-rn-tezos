import { MigrationManifest } from './types';

function createMigrate(migrations: MigrationManifest, config?: { debug: boolean }): MigrationManifest[number] {
  const { debug } = config || {};

  return function (state, currentVersion) {
    if (!state) {
      return state;
    }

    const migrationKeys = Object.keys(migrations)
      .map((ver) => parseInt(ver))
      .filter((key) => currentVersion > key)
      .sort((a, b) => a - b);

    if (process.env.NODE_ENV !== 'production' && debug) console.log('redux-persist: migrationKeys', migrationKeys);

    try {
      const migratedState: any = migrationKeys.reduce((state: any, versionKey) => {
        if (process.env.NODE_ENV !== 'production' && debug) console.log('redux-persist: running migration for versionKey', versionKey);

        return migrations[versionKey](state, currentVersion);
      }, state);

      return Promise.resolve(migratedState);
    } catch (err) {
      return Promise.reject(err);
    }
  };
}

export default createMigrate;
