import PrivateKeyModule, { PRIVATE_KEY_MODULE_NAME, SECP256k1Format } from '@tkey/private-keys';
import SeedPhraseModule, { MetamaskSeedPhraseFormat, SEED_PHRASE_MODULE_NAME } from '@tkey/seed-phrase';
import { TorusStorageLayer } from '@tkey/storage-layer-torus';
import BN from 'bn.js';

export const ENABLE_TORUS_LOGGING = process.env.ENABLE_TORUS_LOGGING === 'true';
export const TORUS_SHARE_INDEX = '1';
export const TORUS_STORAGE_LAYER = new TorusStorageLayer({ hostUrl: 'https://metadata.tor.us' });
export const TORUS_MODULES = {
  [PRIVATE_KEY_MODULE_NAME]: new PrivateKeyModule([new SECP256k1Format(new BN(0))]),
  [SEED_PHRASE_MODULE_NAME]: new SeedPhraseModule([new MetamaskSeedPhraseFormat('https://mainnet.infura.io/v3/bca735fdbba0408bb09471e86463ae68')]),
};

export const AUTH_PROVIDER = {
  GOOGLE: 'GOOGLE',
  APPLE: 'APPLE',
} as const;

export type AuthProvider = typeof AUTH_PROVIDER[keyof typeof AUTH_PROVIDER];
