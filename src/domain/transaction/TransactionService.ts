import '@ethersproject/shims';

import { BigNumber, ethers } from 'ethers';
import { formatUnits, formatEther } from 'ethers/lib/utils';
import qs from 'qs';
import { inject, injectable } from 'tsyringe';

import { abiERC20 } from '@@constants/contract/abi/abiERC20';
import { getNetworkConfig, NETWORK_FEE_TYPE } from '@@constants/network.constant';
import { WalletService } from '@@domain/wallet/services/WalletService';
import { request } from '@@utils/request';

import { ITransactionService, IGetHistoryParams, ISendTransactionRequest } from './TransactionService.type';
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
    try {
      const wallet = await this.walletService.getWalletInfo({ index, bip44 });
      const from = wallet.address;
      const etherInterface = new ethers.utils.Interface(abiERC20);
      const data = etherInterface.encodeFunctionData('Transfer', [from, to, value]);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  sendTransaction = async ({ selectedNetwork, selectedWalletIndex, gasFeeInfo, to, value, data }: ISendTransactionRequest) => {
    try {
      const network = getNetworkConfig(selectedNetwork);
      const wallet = await this.walletService.getWalletInfo({ index: selectedWalletIndex, bip44: network.bip44 });
      switch (network.networkFeeType) {
        case NETWORK_FEE_TYPE.TEZOS:
          if (!gasFeeInfo.tip || !value || !to) {
            throw new Error('tip,value,to is required');
          }
          const fee = parseFloat(formatUnits(gasFeeInfo.tip));
          const amount = parseFloat(formatUnits(value));
          return await this.tezosService.sendTransaction(selectedNetwork, wallet.privateKey, { to, fee, amount });
        case NETWORK_FEE_TYPE.EIP1559:
          if (data) {
            return this.etherService.sendTransaction(selectedNetwork, wallet.privateKey, {
              chainId: network.chainId,
              maxFeePerGas: gasFeeInfo.baseFee,
              maxPriorityFeePerGas: gasFeeInfo.tip,
              gasLimit: gasFeeInfo.gasLimit,
              to,
              data,
            });
          } else {
            return await this.etherService.sendTransaction(selectedNetwork, wallet.privateKey, {
              chainId: network.chainId,
              maxFeePerGas: gasFeeInfo.baseFee,
              maxPriorityFeePerGas: gasFeeInfo.tip,
              gasLimit: gasFeeInfo.gasLimit,
              to,
              value,
            });
          }
        default:
          if (data) {
            return await this.etherService.sendTransaction(selectedNetwork, wallet.privateKey, {
              chainId: network.chainId,
              gasPrice: gasFeeInfo.baseFee,
              gasLimit: gasFeeInfo.gasLimit,
              to,
              data,
            });
          } else {
            return await this.etherService.sendTransaction(selectedNetwork, wallet.privateKey, {
              chainId: network.chainId,
              gasPrice: gasFeeInfo.baseFee,
              gasLimit: gasFeeInfo.gasLimit,
              to,
              value,
            });
          }
      }
    } catch (err) {
      console.log(err);
    }
  };

  getHistory = async (params: IGetHistoryParams) => {
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
