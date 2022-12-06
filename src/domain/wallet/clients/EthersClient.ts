import { Wallet } from 'ethers';
import { HDNode, arrayify, entropyToMnemonic, mnemonicToSeed } from 'ethers/lib/utils';
import { injectable } from 'tsyringe';

import { getNetworkConfig, NETWORK } from '@@constants/network.constant';

import { IWalletClient, IWallet } from './WalletClient.type';

@injectable()
export class EhtersClient implements IWalletClient {
  constructor() {}

  createWalletWithEntropy = async (entropy: string | Uint8Array, index?: number): Promise<IWallet> => {
    const root = createNodeWithEntropy(entropy);
    let wallet: Wallet;
    if (index !== undefined) {
      const derivationPath = this.getDerivationPath(index);
      const node = root.derivePath(derivationPath);
      wallet = new Wallet(node);
    } else {
      wallet = new Wallet(root);
    }

    const { address, publicKey, privateKey } = wallet;
    return { address, publicKey, privateKey };
  };

  createWalletWithMnemonic = async (mnemonic: string, index?: number): Promise<IWallet> => {
    let derivationPath;
    if (index !== undefined) {
      derivationPath = this.getDerivationPath(index);
    }
    const { address, publicKey, privateKey } = Wallet.fromMnemonic(mnemonic, derivationPath);
    return { address, publicKey, privateKey };
  };

  getDerivationPath = (index: number): string => {
    return `m/44'/${getNetworkConfig(NETWORK.ETH).bip44}'/0'/0/${index}`;
  };
}

const createNodeWithEntropy = (entropy: string | Uint8Array): HDNode => {
  let seed: string;
  if (typeof entropy === 'string') {
    seed = entropyToSeed(entropy);
  } else {
    seed = entropyToSeed(entropy);
  }
  return HDNode.fromSeed(seed);
};

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
