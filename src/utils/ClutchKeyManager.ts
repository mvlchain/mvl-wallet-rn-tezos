import * as bitcoinLib from 'bitcoinjs-lib';
import * as bitcoinMessage from 'bitcoinjs-message';
import { entropyToMnemonic, HDNode } from 'ethers/lib/utils';
import HDKey from 'hdkey';

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

  generateSign(message: string, timestampInMs: string): string {
    const { xpub } = this.accountExtendedKey();
    const signingMessage = `${message}|${timestampInMs}`;
    const accountNode = this.hdNode.derivePath(accountBasePath);

    // remove 0x prefix
    const privateKey = accountNode.privateKey.slice(2);
    const signature = bitcoinMessage.sign(signingMessage, Buffer.from(privateKey, 'hex'), true).toString('base64');
    return `${xpub}:${timestampInMs}:${signature}`;
  }

  verifyMessage(body: string, fullSignature: string): boolean {
    const [pubkeyEncoded, ts, sig] = fullSignature.trim().split(':');
    const timestamp = +ts;
    if (timestamp < 0) {
      throw new Error(`invalid timestamp: ${timestamp}`);
    }

    const hdkey = HDKey.fromExtendedKey(pubkeyEncoded);
    const message = `${body}|${ts}`;
    const addr = bitcoinLib.payments.p2pkh({ pubkey: hdkey.publicKey }).address;
    if (!addr) {
      throw new Error('invalid sign exception');
    }
    return bitcoinMessage.verify(message, addr, sig);
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
