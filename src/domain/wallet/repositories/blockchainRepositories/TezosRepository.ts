import { TezosToolkit } from '@taquito/taquito';
import { format } from '@taquito/utils';
// @ts-ignore
import * as tezosCrypto from '@tezos-core-tools/crypto-utils';
import { injectable } from 'tsyringe';

import * as Type from './WalletBlockChaiRepository.type';

@injectable()
export class TezosRepository implements Type.IBlockChainRepository {
  constructor() {}
  getBalance = async ({ selectedWalletPrivateKey, rpcUrl }: Type.IGetCoinBalance) => {
    try {
      const Tezos = new TezosToolkit(rpcUrl);
      const address = tezosCrypto.utils.secretKeyToKeyPair(selectedWalletPrivateKey).pkh;
      const balance = await Tezos.tz.getBalance(address);
      return format('mutez', 'tz', balance).toString();
    } catch (e) {
      throw new Error(`Error:  ${e}`);
    }
  };

  getContractBalance = async ({ contractAddress, abi, address }: Type.IGetTokenBalance) => {
    try {
      return '0';
    } catch (e) {
      throw new Error(`Error:  ${e}`);
    }
  };
}
