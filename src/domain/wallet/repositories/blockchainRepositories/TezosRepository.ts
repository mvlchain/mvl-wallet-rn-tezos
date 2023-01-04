import { compose, TezosToolkit } from '@taquito/taquito';
import { tzip12, Tzip12Module } from '@taquito/tzip12';
import { tzip16 } from '@taquito/tzip16';
import BigNumber from 'bignumber.js';
import { injectable } from 'tsyringe';

import { faType } from '@@utils/faType';
import { formatBigNumber } from '@@utils/formatBigNumber';
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
      return formatBigNumber(BNBalance, decimals).toString();
    } catch (e) {
      throw new Error(`Error:  ${e}`);
    }
  });

  getContractBalance = loadingFunction<string>(async ({ contractAddress, address, rpcUrl, standardType, decimals }: Type.IGetTokenBalance) => {
    try {
      // api나오기 전 임시 작업
      if (faType(contractAddress) === 'fa12') {
        return this._getFa1_2Balance({ contractAddress, address, rpcUrl, decimals });
      } else {
        // fa2
        return this._getFa2Balance({ contractAddress, address, rpcUrl, decimals });
      }
    } catch (e) {
      throw new Error(`Error:  ${e}`);
    }
  });

  getTokenMetadata = async (rpcUrl: string, contractAddress: string) => {
    const Tezos = new TezosToolkit(rpcUrl);
    Tezos.addExtension(new Tzip12Module());
    const contract = await Tezos.wallet.at(contractAddress, tzip12);
    // TODO: tzip12는 fa2.0의 metadata만 가져올 수 있음.
    const { name, decimals, symbol } = await contract.tzip12().getTokenMetadata(0);
    const metadata = {
      name,
      decimals,
      symbol,
    };
    return metadata;
  };

  _getFa1_2Balance = async ({ contractAddress, address, rpcUrl, decimals = 6 }: Type.IGetTokenBalance) => {
    const Tezos = new TezosToolkit(rpcUrl);
    const fa1_2TokenContract = await Tezos.wallet.at(contractAddress, compose(tzip12, tzip16));
    const fa1_2Balance = await fa1_2TokenContract.views.getBalance(address).read();
    const fa1_2BNBalance = new BigNumber(fa1_2Balance.toString());
    return formatBigNumber(fa1_2BNBalance, decimals).toString();
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
    return formatBigNumber(fa2BNBalance, decimals).toString();
  };
}
