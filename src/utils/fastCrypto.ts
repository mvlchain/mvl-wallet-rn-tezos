import { hexlify } from '@ethersproject/bytes';
import { toUtf8Bytes, UnicodeNormalizationForm } from '@ethersproject/strings';
import { arrayify, entropyToMnemonic, HDNode } from 'ethers/lib/utils';
import crypto from 'react-native-quick-crypto';

export function mnemonicToSeed(mnemonic: string, password?: string): string {
  if (!password) {
    password = '';
  }

  const salt = toUtf8Bytes('mnemonic' + password, UnicodeNormalizationForm.NFKD);

  return hexlify(crypto.pbkdf2Sync(toUtf8Bytes(mnemonic, UnicodeNormalizationForm.NFKD), salt, 2048, 64, 'sha512'));
}

export const createNodeWithEntropy = (entropy: string | Uint8Array): HDNode => {
  let seed: string;
  if (typeof entropy === 'string') {
    seed = entropyToSeed(entropy);
  } else {
    seed = entropyToSeed(entropy);
  }
  return HDNode.fromSeed(seed);
};

export function entropyToSeed(entropy: string): string;
export function entropyToSeed(entropy: Uint8Array): string;
export function entropyToSeed(entropy: unknown): string {
  let mnemonic;
  if (typeof entropy === 'string') {
    const bytes = arrayify(entropy, { allowMissingPrefix: true, hexPad: 'left' });
    mnemonic = entropyToMnemonic(bytes);
  } else if (entropy instanceof Uint8Array) {
    mnemonic = entropyToMnemonic(entropy);
  } else {
    throw new Error(`Unsupported type(${entropy}) for entropyToSeed`);
  }
  return mnemonicToSeed(mnemonic);
}
