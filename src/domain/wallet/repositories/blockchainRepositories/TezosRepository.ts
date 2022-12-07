import { compose, TezosToolkit } from '@taquito/taquito';
import { tzip12 } from '@taquito/tzip12';
import { tzip16 } from '@taquito/tzip16';
import { format } from '@taquito/utils';
// @ts-ignore
import * as tezosCrypto from '@tezos-core-tools/crypto-utils';
import { injectable } from 'tsyringe';

import { getTezosDecimalUnit } from '@@utils/tezosDecimal';

import * as Type from './WalletBlockChaiRepository.type';

@injectable()
export class TezosRepository implements Type.IBlockChainRepository {
  constructor() {}
  getBalance = async ({ selectedWalletPrivateKey, rpcUrl, decimals = 6 }: Type.IGetCoinBalance) => {
    try {
      const Tezos = new TezosToolkit(rpcUrl);
      const address = tezosCrypto.utils.secretKeyToKeyPair(selectedWalletPrivateKey).pkh;
      const balance = await Tezos.tz.getBalance(address);
      return format('mutez', getTezosDecimalUnit(decimals), balance).toString();
    } catch (e) {
      throw new Error(`Error:  ${e}`);
    }
  };

  getContractBalance = async ({ contractAddress, address, rpcUrl, standardType }: Type.IGetTokenBalance) => {
    try {
      // api나오기 전 임시 작업
      if (standardType === 'fa1.2') {
        return this._getFa1_2Balance({ contractAddress, address, rpcUrl });
      } else {
        // fa2
        return this._getFa2Balance({ contractAddress, address, rpcUrl });
      }
    } catch (e) {
      throw new Error(`Error:  ${e}`);
    }
  };

  _getFa1_2Balance = async ({ contractAddress, address, rpcUrl, decimals = 6 }: Type.IGetTokenBalance) => {
    const Tezos = new TezosToolkit(rpcUrl);
    const fa1_2TokenContract = await Tezos.wallet.at(contractAddress, compose(tzip12, tzip16));
    const fa1_2Balance = await fa1_2TokenContract.views.getBalance(address).read();
    return format('mutez', getTezosDecimalUnit(decimals), fa1_2Balance).toString();
  };

  _getFa2Balance = async ({ contractAddress, address, rpcUrl, decimals = 6 }: Type.IGetTokenBalance) => {
    const Tezos = new TezosToolkit(rpcUrl);
    const fa2TokenContract = await Tezos.wallet.at(contractAddress);
    const balance = await fa2TokenContract.views
      .balance_of([
        {
          owner: address,
          token_id: 0,
        },
      ])
      .read();
    const fa2BalanceRes = JSON.parse(JSON.stringify(balance));
    const fa2BalanceStr = fa2BalanceRes[0].balance;
    return format('mutez', getTezosDecimalUnit(decimals), fa2BalanceStr).toString();
  };
}
