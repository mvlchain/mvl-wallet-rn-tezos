import crypto from 'crypto';

import { SupportedAlgorithm } from '@ethersproject/sha2';
import { ethers } from 'ethers';
import { entropyToMnemonic, HDNode } from 'ethers/lib/utils';

type AccountExtendedKey = {
  xprv: string;
  xpub: string;
};

const accountBasePath = `m/44'/60'/0'`;

export default class ClutchKeyManager {
  private readonly rootPrivateKey: string;
  private readonly hdNode: HDNode;

  constructor(privateKey: string) {
    const prefixed = privateKey.startsWith('0x') ? privateKey : '0x' + privateKey;
    this.hdNode = HDNode.fromMnemonic(entropyToMnemonic(prefixed));
    this.rootPrivateKey = prefixed;
  }

  extractMnemonic(): string {
    let phrase = this.hdNode.mnemonic?.phrase;
    if (phrase === undefined) {
      throw new Error('mnemonic is undefined');
    }
    return phrase;
  }

  accountExtendedKey(): AccountExtendedKey {
    // https://wolovim.medium.com/ethereum-201-hd-wallets-11d0c93c87f7
    // https://iancoleman.io/bip39/
    const accountNode = this.hdNode.derivePath(accountBasePath);
    return {
      xprv: accountNode.extendedKey,
      xpub: accountNode.neuter().extendedKey,
    };
  }

  getKeyForCoin(index: number): string {
    return this.hdNode.derivePath(`${accountBasePath}/0/${index}`).privateKey;
  }

  getAddressForCoin(index: number): string {
    return this.hdNode.derivePath(`${accountBasePath}/0/${index}`).address;
  }
}
