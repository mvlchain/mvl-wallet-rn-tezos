/* eslint-disable max-lines */
/**
 * HDWallet implementation that creates multiple wallets
 *
 * Clutch is an wallet class that manages public, private key pair which hierarchically derives
 * key pairs.
 *
 * dependencies
 *  - ethers
 *  - @ethersproject/shims
 *  - react-native-get-random-values
 */

import * as bitcoin from 'bitcoinjs-lib';
import * as bitcoinMessage from 'bitcoinjs-message';
import { Wallet } from 'ethers';
import { HDNode, arrayify, entropyToMnemonic, mnemonicToSeed } from 'ethers/lib/utils';
import HDKey from 'hdkey';

import { stripHexPrefix } from '@@utils/platform';

import { BlockChain } from './BlockChain';
import { ExtendedKeyPair } from './ExtendedKeyPair';
import { KeyPair } from './KeyPair';

export class Clutch {
  private wallet: Wallet;

  constructor(wallet: Wallet) {
    this.wallet = wallet;
  }

  get address(): string {
    return this.wallet.address;
  }

  get publicKey(): string {
    return this.wallet.publicKey;
  }

  static createWalletWithEntropy(entropy: string | Uint8Array, derivePath?: string): Clutch {
    const root = createNodeWithEntropy(entropy);

    if (derivePath) {
      const node = root.derivePath(derivePath);
      return new Clutch(new Wallet(node));
    } else {
      return new Clutch(new Wallet(root));
    }
  }

  static createWalletWithMnemonic(mnemonic: string, derivePath?: string): Clutch {
    return new Clutch(Wallet.fromMnemonic(mnemonic, derivePath));
  }

  static createKeyPairWithEntropy(entropy: string | Uint8Array, derivePath?: string): KeyPair {
    const root = createNodeWithEntropy(entropy);

    if (derivePath) {
      const node = root.derivePath(derivePath);
      return {
        privateKey: node.privateKey,
        publicKey: node.publicKey,
      };
    } else {
      return {
        privateKey: root.privateKey,
        publicKey: root.publicKey,
      };
    }
  }

  static createKeyPair(mnemonic: string, derivePath?: string): KeyPair {
    const root = HDNode.fromMnemonic(mnemonic);
    if (derivePath) {
      const node = root.derivePath(derivePath);
      return {
        privateKey: node.privateKey,
        publicKey: node.publicKey,
      };
    } else {
      return {
        privateKey: root.privateKey,
        publicKey: root.publicKey,
      };
    }
  }

  static keyNode(entropy: string | Uint8Array, derivePath?: string): HDNode {
    const node = createNodeWithEntropy(entropy);
    if (derivePath) {
      return node.derivePath(derivePath);
    } else {
      return node;
    }
  }

  // https://wolovim.medium.com/ethereum-201-hd-wallets-11d0c93c87f7
  // https://iancoleman.io/bip39/
  static extendedKeyPair(entropy: string | Uint8Array, derivePath?: string): ExtendedKeyPair {
    const root = createNodeWithEntropy(entropy);
    return extendedKeyPairFrom(root, derivePath);
  }

  static extendedKeyPairWithMnemonic(mnemonic: string, derivePath?: string): ExtendedKeyPair {
    const root = HDNode.fromMnemonic(mnemonic);
    return extendedKeyPairFrom(root, derivePath);
  }

  static extendedPrivateKey(entropy: string | Uint8Array, derivePath?: string): string {
    const root = createNodeWithEntropy(entropy);
    return extendedPrivateKeyFrom(root, derivePath);
  }

  static extendedPrivateKeyWithMnemonic(mnemonic: string, derivePath?: string): string {
    const root = HDNode.fromMnemonic(mnemonic);
    return extendedPrivateKeyFrom(root, derivePath);
  }

  static extendedPublicKey(entropy: string | Uint8Array, derivePath?: string): string {
    const root = createNodeWithEntropy(entropy);
    return extendedPublicKeyFrom(root, derivePath);
  }

  static extendedPublicKeyWithMnemonic(mnemonic: string, derivePath?: string): string {
    const root = HDNode.fromMnemonic(mnemonic);
    return extendedPublicKeyFrom(root, derivePath);
  }

  /**
   * Sign a given message with root key calculated from extended private key
   * signingMessage: message|timestamp
   * @param account
   * @param message a message to sign
   * @param timestampInMs timestamp in millisecond
   * @return signature of the message in a format as follows:
   *  {publicKey}:{timestamp}:{sig}
   */
  static signMessageByExtendedKeyPair(account: HDNode, message: string, timestampInMs: string): string {
    const node = HDNode.fromExtendedKey(account.extendedKey);
    const xpub = node.neuter().extendedKey;
    const prv = stripHexPrefix(node.privateKey);
    console.log(`Clutch> signing xprv: ${prv}, xpub: ${node.publicKey}`);

    const signingMessage = `${message}|${timestampInMs}`;
    const signature = bitcoinMessage.sign(signingMessage, Buffer.from(prv, 'hex'), true).toString('base64');
    return `${xpub}:${timestampInMs}:${signature}`;
  }

  static verifyMessageByExtendedKeyPair(body: string, fullSignature: string): boolean {
    const [pubkeyEncoded, ts, sig] = fullSignature.trim().split(':');
    const timestamp = +ts;
    if (timestamp < 0) {
      throw new Error(`invalid timestamp: ${timestamp}`);
    }

    const hdkey = HDKey.fromExtendedKey(pubkeyEncoded);
    const message = `${body}|${ts}`;
    const addr = bitcoin.payments.p2pkh({ pubkey: hdkey.publicKey }).address;
    if (!addr) {
      throw new Error('invalid sign exception');
    }
    return bitcoinMessage.verify(message, addr, sig);
  }
}

function createNodeWithEntropy(entropy: string | Uint8Array): HDNode {
  let seed: string;
  if (typeof entropy === 'string') {
    seed = entropyToSeed(entropy);
  } else {
    seed = entropyToSeed(entropy);
  }
  return HDNode.fromSeed(seed);
}

function entropyToSeed(entropy: string): string;
function entropyToSeed(entropy: Uint8Array): string;
function entropyToSeed(entropy: unknown): string {
  if (typeof entropy === 'string') {
    const bytes = arrayify(entropy, { allowMissingPrefix: true, hexPad: 'left' });
    return mnemonicToSeed(entropyToMnemonic(bytes));
  } else if (entropy instanceof Uint8Array) {
    return mnemonicToSeed(entropyToMnemonic(entropy));
  }

  throw new Error(`Unsupported type(${entropy}) for entropyToSeed`);
}

function extendedKeyPairFrom(node: HDNode, derivePath?: string): ExtendedKeyPair {
  if (derivePath) {
    const derived = node.derivePath(derivePath);
    return {
      xprv: derived.extendedKey,
      xpub: derived.neuter().extendedKey,
    };
  } else {
    return {
      xprv: node.extendedKey,
      xpub: node.neuter().extendedKey,
    };
  }
}

function extendedPrivateKeyFrom(node: HDNode, derivePath?: string): string {
  if (derivePath) {
    const derived = node.derivePath(derivePath);
    return derived.extendedKey;
  } else {
    return node.extendedKey;
  }
}

function extendedPublicKeyFrom(node: HDNode, derivePath?: string): string {
  if (derivePath) {
    const derived = node.derivePath(derivePath);
    return derived.neuter().extendedKey;
  } else {
    return node.neuter().extendedKey;
  }
}

/**
 * Build a BIP44 path to create hd wallet
 * @param network BlockChain network constant objec to get coinType values
 *  SLIP-0044(https://github.com/satoshilabs/slips/blob/master/slip-0044.md)
 * @param addressIndex address index number
 * @returns BIP44 format key derivation path as string
 */
export function keyDerivationPath(network: BlockChain, addressIndex: number): string {
  return `m/44'/${network.coinType}'/0'/0/${addressIndex}`;
}

/**
 * Build a extended root key path, This method is going to be used to create
 * an extended master KeyPair
 * for Clutch mobile app in order to provide an authentication.
 * @param network BlockChain network constant objec to get coinType values
 *  SLIP-0044(https://github.com/satoshilabs/slips/blob/master/slip-0044.md)
 * @returns root extended key path for Clutch
 */
export function extendedKeyPath(network: BlockChain): string {
  return `m/44'/${network.coinType}'/0'`;
}
