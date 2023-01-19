import { Wallet } from 'ethers';
import { injectable } from 'tsyringe';

import { getNetworkConfig, NETWORK } from '@@constants/network.constant';
import { createNodeWithEntropy } from '@@utils/fastCrypto';

import { IWallet, IWalletClient } from './WalletClient.type';

@injectable()
export class EthersWalletClient implements IWalletClient {
  constructor() {}

  createWalletWithEntropy = (entropy: string | Uint8Array, index?: number): IWallet => {
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

  createWalletWithMnemonic = (mnemonic: string, index?: number): IWallet => {
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
