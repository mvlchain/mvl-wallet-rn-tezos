import { InMemorySigner } from '@taquito/signer';
import { TezosToolkit } from '@taquito/taquito';
import Decimal from 'decimal.js';
import { ethers } from 'ethers';
import { formatEther } from 'ethers/lib/utils';
import qs from 'qs';

import { TRANSACTION_TYPE, TRANSACTION_STATUS } from '@@constants/transaction.constant';
import { request, authRequest } from '@@utils/request';

import { ITransactionService, ITransaction, TTransactionStatus, TTransactionType, IFetchTransactionHistoryRequest } from './TransactionService.type';

export class EvmNetworkInfo {
  constructor(readonly rpcUrl: string, readonly chainId: number) {}
}

export class TezosNetworkInfo {
  constructor(readonly rpcUrl: string) {}
}

export class GasFeeInfo {
  constructor(readonly gasPrice: string) {}
}

export class EthersTransactionImpl implements ITransactionService {
  constructor(
    private readonly selectedNetworkInfo: EvmNetworkInfo,
    private readonly selectedWalletPrivateKey: string,
    private readonly selectedGasFeeInfo: GasFeeInfo
  ) {}

  async sendTransaction(from: string, to: string, value: string, data: string | undefined): Promise<string> {
    const provider = new ethers.providers.JsonRpcProvider(this.selectedNetworkInfo.rpcUrl);

    const wallet = new ethers.Wallet(this.selectedWalletPrivateKey, provider);

    const res = await wallet.sendTransaction({
      from,
      to,
      data,
      value,
      gasPrice: this.selectedGasFeeInfo.gasPrice,
      chainId: this.selectedNetworkInfo.chainId,
    });

    return res.hash;
  }
  async approveTransaction(txId: string) {
    return 'good';
  }
  async cancelTransaction(txId: string) {
    return 'good';
  }
  async speedUpTransaction(txId: string) {
    return 'good';
  }
  async estimateGas(transaction: ITransaction) {
    return 'good';
  }
  async getHistory(params: IFetchTransactionHistoryRequest) {
    //TODO: v2에서는 auth header붙여야함
    try {
      const endpoint = `/v1/wallets/transactions?${qs.stringify(params)}`;
      const res = await request.get(endpoint);
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

export class TezosTaquitoTransactionsImpl implements ITransactionService {
  constructor(
    private readonly selectedNetworkInfo: TezosNetworkInfo,
    private readonly selectedWalletPrivateKey: string,
    private readonly selectedGasFeeInfo: GasFeeInfo
  ) {}

  // Tezos는 general한 sendTransaction을 raw string data를 활용하는 방식으로 구현하기 어려워서 transfer 기준으로 일단 구현
  async sendTransaction(from: string, to: string, value: string, data: string | undefined): Promise<string> {
    const Tezos = new TezosToolkit(this.selectedNetworkInfo.rpcUrl);
    Tezos.setProvider({
      signer: new InMemorySigner(this.selectedWalletPrivateKey),
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
        to: to,
        amount: new Decimal(formatEther(value)).toNumber(),
        fee: Number(this.selectedGasFeeInfo.gasPrice),
      })
      .send()
      .then((op) => op.confirmation(1).then(() => op.opHash));
    console.log(`txHash: ${txHash}`);
    return txHash;
  }

  async approveTransaction(txId: string) {
    return 'good';
  }
  async cancelTransaction(txId: string) {
    return 'good';
  }
  async speedUpTransaction(txId: string) {
    return 'good';
  }
  async estimateGas(transaction: ITransaction) {
    return 'good';
  }
  async getHistory(params: IFetchTransactionHistoryRequest) {
    //TODO: v2에서는 auth header붙여야함
    try {
      const endpoint = `/v1/wallets/transactions?${qs.stringify(params)}`;
      const res = await request.get(endpoint);
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
    status: TTransactionStatus.FAIL,
    to: '0xAEa73293569cf1e4CA314d44b0DE3f648A76a173',
    from: '0x09Fc9e92261113C227c0eC6F1B20631AA7b2789d',
    hash: '0x6e7bde8ca2d601bd2fac793c68b3f82317ee64d9a71d069a216aef4cb78e759f',
    value: '15',
    fee: '0.04',
    updatedAt: '2022-01-20T12:01:30.543Z',
    ticker: 'ETH',
    blockNumber: 2147483647,
    index: 2147483647,
    nonce: 0,
  },
];
