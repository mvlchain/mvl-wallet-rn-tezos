// @ts-ignore
import * as tezosCrypto from '@tezos-core-tools/crypto-utils';
import { injectable } from 'tsyringe';

import { getNetworkConfig, NETWORK } from '@@constants/network.constant';

import { IWalletClient, IWallet } from './WalletClient.type';

@injectable()
export class TezosClient implements IWalletClient {
  constructor() {}
  createWalletWithEntropy = (entropy: string | Uint8Array, index?: number): IWallet => {
    const bufEntropy = tezosCrypto.common.hexToBuf(entropy);
    const mnemonic = tezosCrypto.utils.entropyToMnemonic(bufEntropy);
    return this.createWalletWithMnemonic(mnemonic, index);
  };

  createWalletWithMnemonic = (mnemonic: string, index?: number): IWallet => {
    const mnemonicToSeed = tezosCrypto.utils.mnemonicToSeed(mnemonic, '', true);
    const keyPair = tezosCrypto.hd.keyPairFromAccountIndex(mnemonicToSeed, index ?? 0);
    const { sk: privateKey, pk: publicKey, pkh: address } = keyPair;

    return { address, publicKey, privateKey };
  };

  getDerivationPath = (index: number): string => {
    return `44'/${getNetworkConfig(NETWORK.TEZOS).bip44}'/${index}'/0'`;
  };
}
