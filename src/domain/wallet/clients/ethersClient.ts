import { Wallet } from 'ethers';
import { HDNode, arrayify, entropyToMnemonic, mnemonicToSeed } from 'ethers/lib/utils';
import { injectable } from 'tsyringe';

import { getNetworkConfig, NETWORK } from '@@constants/network.constant';

import { IWalletClient, IWallet } from './walletClient.type';

@injectable()
export class EhtersClient implements IWalletClient {
  wallet: IWallet;

  constructor() {
    // TODO: wallet 기본값 생각해보기
    this.wallet = {
      address: '',
      publicKey: '',
      privateKey: '',
    };
  }

  createWalletWithEntropy = async (entropy: string | Uint8Array, derivePath?: string): Promise<void> => {
    const root = createNodeWithEntropy(entropy);

    if (derivePath) {
      const node = root.derivePath(derivePath);
      const { address, publicKey, privateKey } = node;
      this.wallet = { address, publicKey, privateKey };
    } else {
      const { address, publicKey, privateKey } = root;
      this.wallet = { address, publicKey, privateKey };
    }
  };

  createWalletWithMnemonic = async (mnemonic: string, derivePath?: string): Promise<void> => {
    const { address, publicKey, privateKey } = Wallet.fromMnemonic(mnemonic, derivePath);
    this.wallet = { address, publicKey, privateKey };
  };

  getDerivePath = (index: number): string => {
    return `m/44'/${getNetworkConfig(NETWORK.ETH).bip44}'/0'/0/${index}`;
  };
}
// ================== extended key pair ==================

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
