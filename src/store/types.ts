export type MigrationManifest = Record<number, (persistedState: any, version: number) => any | Promise<any>>;
