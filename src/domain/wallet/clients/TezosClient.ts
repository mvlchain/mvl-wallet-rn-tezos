import { Curves, InMemorySigner } from '@taquito/signer';
import { TezosToolkit } from '@taquito/taquito';
import 'text-encoding-polyfill';
import { b58cencode, Prefix, prefix } from '@taquito/utils';
import { arrayify, entropyToMnemonic } from 'ethers/lib/utils';
import { injectable } from 'tsyringe';

import { getNetworkConfig, getNetworkName, NETWORK } from '@@constants/network.constant';

import { IWalletClient, IWallet } from './WalletClient.type';

@injectable()
export class TezosClient implements IWalletClient {
  constructor() {}

  createWalletWithEntropy = async (entropy: string | Uint8Array, derivePath?: string): Promise<IWallet> => {
    const Tezos = new TezosToolkit(getNetworkConfig(getNetworkName(false, NETWORK.TEZOS)).rpcUrl);
    if (derivePath) {
      /**
       * pkey와 derivePath를 조합해 wallet을 뽑아낼 때,
       * 기존 방식대로 pkey만을 이용해서 root를 생성한 후 derivePath를 이용해서 계층을 생성하는 방법이 안되는 것 같습니다.
       * 이를 해결하고자 pkey를 mnemonic으로 변환한 후 mnemonic을 이용해서 계층을 생성하는 방법을 사용하였습니다.
       * tezos로직에서 ethers의 util을 사용해 pkey -> mnemonic으로 변환하는 함수(entropyToMnemonic)를 사용하는 것이 괜찮을지 의문입니다.
       *  */
      const bytes = arrayify(entropy, { allowMissingPrefix: true, hexPad: 'left' });
      const mnemonic = entropyToMnemonic(bytes);
      return await this.createWalletWithMnemonic(mnemonic, derivePath);
    } else {
      const b58encodedSecret = b58cencode(entropy, prefix[Prefix.P2SK]);
      const signer = await InMemorySigner.fromSecretKey(b58encodedSecret);
      Tezos.setSignerProvider(signer);
      const wallet = await Tezos.signer;

      const publicKey = await wallet.publicKey();
      const address = await wallet.publicKeyHash();
      const privateKey = await wallet.secretKey();
      if (!privateKey) throw new Error('No private key');

      return { address, publicKey, privateKey };
    }
  };

  createWalletWithMnemonic = async (mnemonic: string, derivePath?: string): Promise<IWallet> => {
    const Tezos = new TezosToolkit(getNetworkConfig(getNetworkName(false, NETWORK.TEZOS)).rpcUrl);

    const params = {
      mnemonic,
      derivationPath: derivePath,
      curve: 'ed25519' as Curves,
    };

    const signer = InMemorySigner.fromMnemonic(params);
    Tezos.setSignerProvider(signer);
    const wallet = await Tezos.signer;

    const publicKey = await wallet.publicKey();
    const address = await wallet.publicKeyHash();
    const privateKey = await wallet.secretKey();
    if (!privateKey) throw new Error('No private key');

    return { address, publicKey, privateKey };
  };

  getDerivePath = (index: number): string => {
    return `44'/${getNetworkConfig(NETWORK.TEZOS).bip44}'/${index}'/0'`;
  };
}
