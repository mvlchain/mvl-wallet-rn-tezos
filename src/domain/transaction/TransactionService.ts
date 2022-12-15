import { BigNumber, ethers } from 'ethers';
import { formatUnits, parseUnits } from 'ethers/lib/utils';
import qs from 'qs';
import { inject, injectable } from 'tsyringe';

import appconfig from '@@config/appconfig';
import { abiERC20 } from '@@constants/contract/abi/abiERC20';
import { getNetworkConfig, NETWORK_FEE_TYPE, Network } from '@@constants/network.constant';
import { WalletService } from '@@domain/wallet/services/WalletService';
import { request } from '@@utils/request';

import { ITransactionService, IGetHistoryParams, ISendTransactionRequest, IRegisterTransactionRequest } from './TransactionService.type';
import { ITransactionServiceEthers } from './service/transactionServiceEthers/TransactionServiceEthers.type';
import { ITezosData, ITransactionServiceTezos } from './service/transactionServiceTezos/TransactionServiceTezos.type';
@injectable()
export class TransactionService implements ITransactionService {
  constructor(
    @inject('TransactionServiceEthers') private etherService: ITransactionServiceEthers,
    @inject('TransactionServiceTezos') private tezosService: ITransactionServiceTezos,
    @inject('WalletService') private walletService: WalletService
  ) {}

  getTransferData = async (selectedNetwork: Network, selectedWalletIndex: number, to: string, value: BigNumber) => {
    try {
      const network = getNetworkConfig(selectedNetwork);
      const wallet = await this.walletService.getWalletInfo({ index: selectedWalletIndex, network: selectedNetwork });

      switch (network.networkFeeType) {
        case NETWORK_FEE_TYPE.TEZOS:
          const data: ITezosData = {
            from: wallet.address,
            to,
            value: formatUnits(value, 6),
          };
          return JSON.stringify(data);
        case NETWORK_FEE_TYPE.EIP1559:
          return new ethers.utils.Interface(abiERC20).encodeFunctionData('transfer', [to, value]);

        case NETWORK_FEE_TYPE.EVM_LEGACY_GAS:
          return new ethers.utils.Interface(abiERC20).encodeFunctionData('transfer', [to, value]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  sendTransaction = async ({ selectedNetwork, selectedWalletIndex, gasFeeInfo, to, value, data }: ISendTransactionRequest) => {
    try {
      const network = getNetworkConfig(selectedNetwork);
      const wallet = await this.walletService.getWalletInfo({ index: selectedWalletIndex, network: selectedNetwork });

      switch (network.networkFeeType) {
        case NETWORK_FEE_TYPE.TEZOS:
          if (!gasFeeInfo.tip || !gasFeeInfo.total || !value || !to) {
            throw new Error('tip,value,to is required');
          }
          const fee = parseFloat(parseUnits(gasFeeInfo.total.toString(), 6).toString());
          const amount = parseFloat(formatUnits(value, 6));
          if (data) {
            return await this.tezosService.sendContractTransaction(selectedNetwork, wallet.privateKey, { to, fee, amount, data: data as string });
          } else {
            return await this.tezosService.sendTransaction(selectedNetwork, wallet.privateKey, { to, fee, amount });
          }
        case NETWORK_FEE_TYPE.EIP1559:
          return await this.etherService.sendTransaction(selectedNetwork, wallet.privateKey, {
            chainId: network.chainId,
            maxFeePerGas: gasFeeInfo.baseFee.add(gasFeeInfo.tip!),
            maxPriorityFeePerGas: gasFeeInfo.tip,
            gasLimit: gasFeeInfo.gas,
            to,
            value,
            data,
          });
        case NETWORK_FEE_TYPE.EVM_LEGACY_GAS:
          return await this.etherService.sendTransaction(selectedNetwork, wallet.privateKey, {
            chainId: network.chainId,
            gasPrice: gasFeeInfo.baseFee,
            gasLimit: gasFeeInfo.gas,
            to,
            value,
            data,
          });
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

  registerHistory = async (params: IRegisterTransactionRequest) => {
    try {
      const authConfig = appconfig().auth;
      const basicCredential = `${authConfig.basic.username}:${authConfig.basic.password}`;
      const encoded = new Buffer(basicCredential, 'utf8').toString('base64');
      const endpoint = `/v1/wallets/transactions`;
      const res = await request.post(endpoint, {
        headers: {
          Authorization: `Basic ${encoded}`,
        },
        data: params,
      });
      if (res.status === 201) {
        return res.data;
      } else {
        return [];
      }
    } catch (e) {
      return [];
    }
  };
}
