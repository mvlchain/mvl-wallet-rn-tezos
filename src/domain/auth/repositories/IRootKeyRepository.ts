import { ExtendedKeyPair } from '@@domain/blockchain/ExtendedKeyPair';

export interface RootKeyRepository {
  saveRootKey: (privateKey: string, password: string) => Promise<void>;
  saveRootKeyByCredentials: (privateKey: string) => Promise<void>;
  getRootKey: (password: string) => Promise<string>;
  getRootKeyByCredentials: () => Promise<string>;
  getExtendedKeyPairByCredentials: () => Promise<ExtendedKeyPair>;
  getExtendedKeyPair: (password: string) => Promise<ExtendedKeyPair>;
  getExtendedPublicKey: () => Promise<string>;
  clearRootKey: () => Promise<void>;
}
