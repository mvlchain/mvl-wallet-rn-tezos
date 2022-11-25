import { InMemorySigner } from '@taquito/signer';
import { TezosToolkit, TransferParams } from '@taquito/taquito';
import Decimal from 'decimal.js';
import '@ethersproject/shims';
import { BigNumber, ethers } from 'ethers';
import { formatEther } from 'ethers/lib/utils';
import qs from 'qs';
import { inject, injectable } from 'tsyringe';

import { request, authRequest } from '@@utils/request';

import {
  ITransactionService,
  TTransactionStatus,
  TTransactionType,
  IGetHistoryArguments,
  ISendTransactionArguments,
  ITezosSendTransactionArguments,
  ITezosEstimateArguments,
} from './TransactionService.type';

@injectable()
export class EthersTransactionImpl implements ITransactionService {
  constructor() {}

  async sendTransaction(args: ISendTransactionArguments): Promise<string> {
    const { networkInfo, privateKey, from, to, value, data, gasFeeInfo } = args;
    const provider = new ethers.providers.JsonRpcProvider(networkInfo.rpcUrl);
    const wallet = new ethers.Wallet(privateKey, provider);

    const res = await wallet.sendTransaction({
      from,
      to,
      data,
      value,
      chainId: networkInfo.chainId,
      ...gasFeeInfo,
    });

    return res.hash;
  }
  async approveTransaction(args: ISendTransactionArguments) {
    const { networkInfo, privateKey, from, to, value, data, gasFeeInfo } = args;
    const provider = new ethers.providers.JsonRpcProvider(networkInfo.rpcUrl);
    const wallet = new ethers.Wallet(privateKey, provider);

    const res = await wallet.signTransaction({
      from,
      to,
      data,
      value,
      chainId: networkInfo.chainId,
      ...gasFeeInfo,
    });

    return res;
  }
  async cancelTransaction(txId: string) {
    return 'good';
  }
  async speedUpTransaction(txId: string) {
    return 'good';
  }
  async estimateGas(args: ISendTransactionArguments) {
    const { networkInfo, privateKey, to, value, data } = args;
    const provider = new ethers.providers.JsonRpcProvider(networkInfo.rpcUrl);
    const wallet = new ethers.Wallet(privateKey, provider);

    const res = await wallet.estimateGas({
      to,
      data,
      value,
    });

    return res;
  }

  async getHistory(params: IGetHistoryArguments) {
    //TODO: v2에서는 auth header붙여야함
    try {
      // const endpoint = `/v1/wallets/transactions?${qs.stringify(params)}`;
      // const res = await request.get(endpoint);
      // console.log('resr', res);
      const res = { status: 200 };
      if (res.status === 200) {
        return mockData;
        // return res.data;
      } else {
        return undefined;
      }
    } catch (e) {
      return undefined;
    }
  }
}
@injectable()
export class TezosTaquitoTransactionsImpl implements ITransactionService {
  constructor() {}

  // Tezos는 general한 sendTransaction을 raw string data를 활용하는 방식으로 구현하기 어려워서 transfer 기준으로 일단 구현
  async sendTransaction(args: ITezosSendTransactionArguments): Promise<string> {
    const { networkInfo, privateKey, from, to, value, data, gasFeeInfo } = args;
    const Tezos = new TezosToolkit(networkInfo.rpcUrl);
    Tezos.setProvider({
      signer: new InMemorySigner(privateKey),
    });

    // 나중에 methodName과 methodArgumentObject 를 밖에서 받아서 구현할 수 있을 때 참고
    // const contract = await Tezos.contract.at(to);
    // const methodName = 'methodName';
    // const methodArgumentObject = {};
    // const txHash = await contract.methodsObject[methodName](methodArgumentObject)
    //   .send({
    //     fee: Number(this.selectedGasFeeInfo.gasPrice),
    //   })
    //   .then((op) => op.confirmation(1).then(() => op.hash));

    const txHash = await Tezos.wallet
      .transfer({
        to,
        amount: new Decimal(formatEther(value)).toNumber(),
        fee: Number(gasFeeInfo.gasPrice),
      })
      .send()
      .then((op) => op.confirmation(1).then(() => op.opHash));
    console.log(`txHash: ${txHash}`);
    return txHash;
  }

  async approveTransaction(args: ISendTransactionArguments) {
    return 'approve';
  }
  async cancelTransaction(txId: string) {
    return 'good';
  }
  async speedUpTransaction(txId: string) {
    return 'good';
  }
  async estimateGas(args: ITezosEstimateArguments) {
    const { networkInfo, privateKey, to, value } = args;
    const Tezos = new TezosToolkit(networkInfo.rpcUrl);
    Tezos.setProvider({
      signer: new InMemorySigner(privateKey),
    });
    const estimation = await Tezos.estimate.transfer({ to, amount: value });

    return estimation;
  }

  async getHistory(args: IGetHistoryArguments) {
    //TODO: v2에서는 auth header붙여야함
    try {
      // const endpoint = `/v1/wallets/transactions?${qs.stringify(params)}`;
      // const res = await request.get(endpoint);
      // console.log('resr', res);
      const res = { status: 200 };
      if (res.status === 200) {
        return mockData;
        // return res.data;
      } else {
        return undefined;
      }
    } catch (e) {
      return undefined;
    }
  }
}

const mockData = [
  {
    type: TTransactionType.SEND_ETH,
    status: TTransactionStatus.SUCCESS,
    from: '0xAEa73293569cf1e4CA314d44b0DE3f648A76a173',
    to: '0x09Fc9e92261113C227c0eC6F1B20631AA7b2789d',
    hash: '0x6e7bde8ca2d601bd2fac793c68b3f82317ee64d9a71d069a216aef4cb78e759f',
    value: '15',
    fee: '0.04',
    updatedAt: '2022-01-20T12:01:30.543Z',
    ticker: 'ETH',
    blockNumber: 2147483647,
    index: 2147483647,
    nonce: 0,
  },
  {
    type: TTransactionType.SEND_ETH,
    status: TTransactionStatus.PENDING,
    to: '0xAEa73293569cf1e4CA314d44b0DE3f648A76a173',
    from: '0x09Fc9e92261113C227c0eC6F1B20631AA7b2789d',
    hash: '0x6e7bde8ca2d601bd2fac793c68b3f82317ee64d9a71d069a216aef4cb78e',
    value: '15',
    fee: '0.04',
    updatedAt: '2022-01-20T12:01:30.543Z',
    ticker: 'ETH',
    blockNumber: 2147483647,
    index: 2147483647,
    nonce: 0,
  },
  {
    type: TTransactionType.SEND_ETH,
    status: TTransactionStatus.FAIL,
    to: '0xAEa73293569cf1e4CA314d44b0DE3f648A76a173',
    from: '0x09Fc9e92261113C227c0eC6F1B20631AA7b2789d',
    hash: '0x6e7bde8ca2d601bd2fac793c68b3f82317ee64d9a71d069a216aef4cb',
    value: '15',
    fee: '0.04',
    updatedAt: '2022-01-20T12:01:30.543Z',
    ticker: 'ETH',
    blockNumber: 2147483647,
    index: 2147483647,
    nonce: 0,
  },
];
//환산겂 구하기
// id: mass-vehicle-ledger / ethereum /binancecoin /binance-bitcoin
//v1.1/wallets/simple/price
//ids comma
//vs_currencies
