import '@ethersproject/shims';
import { BigNumber, ethers } from 'ethers';
import { BytesLike } from 'ethers/lib/utils';
import qs from 'qs';
import { inject, injectable } from 'tsyringe';

import { abiERC20 } from '@@constants/contract/abi/abiERC20';
import { getNetworkConfig, Network, NETWORK_FEE_TYPE } from '@@constants/network.constant';
import { WalletService } from '@@domain/wallet/services/WalletService';
import { request } from '@@utils/request';

import { ITransactionService, TTransactionStatus, TTransactionType, IGetHistoryParams } from './TransactionService.type';
import { ITransactionServiceEthers } from './service/transactionServiceEthers/TransactionServiceEthers.type';
import { ITransactionServiceTezos } from './service/transactionServiceTezos/TransactionServiceTezos.type';

@injectable()
export class TransactionService implements ITransactionService {
  constructor(
    @inject('TransactionServiceEthers') private etherService: ITransactionServiceEthers,
    @inject('TransactionServiceTezos') private tezosService: ITransactionServiceTezos,
    @inject('WalletService') private walletService: WalletService
  ) {}

  encodeTransferData = async (index: number, bip44: number, to: string, value: BigNumber) => {
    const wallet = await this.walletService.getWalletInfo({ index, bip44 });
    const from = wallet.address;
    const etherInterface = new ethers.utils.Interface(abiERC20);
    const data = etherInterface.encodeFunctionData('Transfer', [from, to, value]);
    return data;
  };

  sendTransaction = async ({
    selectedNetwork,
    gasFeeInfo,
    to,
    from,
    value,
    data,
  }: {
    selectedNetwork: Network;
    gasFeeInfo: {
      baseFee: BigNumber;
      tip?: BigNumber;
      gasLimit: BigNumber;
    };
    to: string;
    from?: BigNumber;
    value: BigNumber;
    data?: BytesLike | null;
  }): Promise<string> => {
    const network = getNetworkConfig(selectedNetwork);

    switch (network.networkFeeType) {
      case NETWORK_FEE_TYPE.TEZOS:
        return this.tezosService.sendTransaction();
      case NETWORK_FEE_TYPE.EIP1559:
        return this.etherService.sendTransaction();
      default:
        return this.etherService.sendTransaction();
    }
  };

  getHistory = async (params: IGetHistoryParams) => {
    //TODO: v2에서는 auth header붙여야함
    try {
      const endpoint = `/v1/wallets/transactions?${qs.stringify(params)}`;
      const res = await request.get(endpoint);
      if (res.status === 200) {
        return res.data;
      } else {
        return [];
      }
    } catch (e) {
      return [];
    }
  };
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
