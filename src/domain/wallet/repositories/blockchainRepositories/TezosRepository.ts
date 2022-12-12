import { compose, TezosToolkit } from '@taquito/taquito';
import { tzip12 } from '@taquito/tzip12';
import { tzip16 } from '@taquito/tzip16';
// @ts-ignore
import * as tezosCrypto from '@tezos-core-tools/crypto-utils';
import BigNumber from 'bignumber.js';
import { injectable } from 'tsyringe';

import { formatTezos } from '@@utils/formatTezos';
import { loadingFunction } from '@@utils/loadingHelper';

import * as Type from './WalletBlockChaiRepository.type';

@injectable()
export class TezosRepository implements Type.IBlockChainRepository {
  constructor() {}
  getBalance = loadingFunction<string>(async ({ selectedWalletAddress, rpcUrl, decimals = 6 }: Type.IGetCoinBalance) => {
    try {
      const Tezos = new TezosToolkit(rpcUrl);
      const balance = await Tezos.tz.getBalance(selectedWalletAddress);
      const BNBalance = new BigNumber(balance.toString());
      return formatTezos(BNBalance, decimals).toString();
    } catch (e) {
      throw new Error(`Error:  ${e}`);
    }
  });

  getContractBalance = loadingFunction<string>(async ({ contractAddress, address, rpcUrl, standardType, decimals }: Type.IGetTokenBalance) => {
    try {
      // api나오기 전 임시 작업
      if (standardType === 'fa1.2') {
        return this._getFa1_2Balance({ contractAddress, address, rpcUrl, decimals });
      } else {
        // fa2
        return this._getFa2Balance({ contractAddress, address, rpcUrl, decimals });
      }
    } catch (e) {
      throw new Error(`Error:  ${e}`);
    }
  });

  _getFa1_2Balance = async ({ contractAddress, address, rpcUrl, decimals = 6 }: Type.IGetTokenBalance) => {
    const Tezos = new TezosToolkit(rpcUrl);
    const fa1_2TokenContract = await Tezos.wallet.at(contractAddress, compose(tzip12, tzip16));
    const fa1_2Balance = await fa1_2TokenContract.views.getBalance(address).read();
    const fa1_2BNBalance = new BigNumber(fa1_2Balance.toString());
    return formatTezos(fa1_2BNBalance, decimals).toString();
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
    const fa2BNBalance = new BigNumber(fa2BalanceStr.toString());
    return formatTezos(fa2BNBalance, decimals).toString();
  };
}
