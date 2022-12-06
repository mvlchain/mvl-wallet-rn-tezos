import { compose, TezosToolkit } from '@taquito/taquito';
import { tzip12 } from '@taquito/tzip12';
import { tzip16 } from '@taquito/tzip16';
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

  getContractBalance = async ({ contractAddress, address, rpcUrl }: Type.IGetTokenBalance) => {
    try {
      // fa1.2, fa2에 따라 함수 호출 필요 -> 어떻게 구분할 것인가?
      return '0';
    } catch (e) {
      throw new Error(`Error:  ${e}`);
    }
  };

  _getFa1_2Balance = async ({ contractAddress, address, rpcUrl }: Type.IGetTokenBalance) => {
    const Tezos = new TezosToolkit(rpcUrl);
    // const fa1_2TokenContractAddress = 'KT1QzmrMs1xUXZJ8TPAoDEFaKC6w56RfdLWo'; // USDtz
    const fa1_2TokenContract = await Tezos.wallet.at(contractAddress, compose(tzip12, tzip16));
    const fa1_2Balance = await fa1_2TokenContract.views.getBalance(address).read();
    console.log(fa1_2Balance.toFixed());
    return fa1_2Balance.toFixed();
  };

  _getFa2Balance = async ({ contractAddress, address, rpcUrl }: Type.IGetTokenBalance) => {
    const Tezos = new TezosToolkit(rpcUrl);
    // const fa2TokenContractAddress = 'KT19363aZDTjeRyoDkSLZhCk62pS4xfvxo6c'; // QUIPU
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
    console.log(fa2BalanceStr);
    return fa2BalanceStr;
  };
}
