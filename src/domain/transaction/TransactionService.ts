import { BigNumber } from 'bignumber.js';
import { BigNumber as BigNumberEther, ethers } from 'ethers';
import qs from 'qs';
import { inject, injectable } from 'tsyringe';

import appconfig from '@@config/appconfig';
import { abiERC20 } from '@@constants/contract/abi/abiERC20';
import { getNetworkConfig, NETWORK_FEE_TYPE, Network, COIN_DTO } from '@@constants/network.constant';
import { WalletService } from '@@domain/wallet/services/WalletService';
import { BnToEtherBn, formatBigNumber } from '@@utils/formatBigNumber';
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
            value: formatBigNumber(value, COIN_DTO[network.coin].decimals).toString(10),
          };
          return JSON.stringify(data);
        case NETWORK_FEE_TYPE.EIP1559:
          return new ethers.utils.Interface(abiERC20).encodeFunctionData('transfer', [to, value.toString(10)]);

        case NETWORK_FEE_TYPE.EVM_LEGACY_GAS:
          return new ethers.utils.Interface(abiERC20).encodeFunctionData('transfer', [to, value.toString(10)]);
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
          if (data) {
            //fee unit mutez, amount unit tez, so only amount use formatBigNumber
            return await this.tezosService.sendContractTransaction(selectedNetwork, wallet.privateKey, {
              to,
              fee: gasFeeInfo.total.toNumber(),
              amount: +formatBigNumber(value, COIN_DTO[network.coin].decimals).toString(10),
              data: data as string,
            });
          } else {
            return await this.tezosService.sendTransaction(selectedNetwork, wallet.privateKey, {
              to,
              fee: gasFeeInfo.total.toNumber(),
              amount: +formatBigNumber(value, COIN_DTO[network.coin].decimals).toString(10),
            });
          }
        case NETWORK_FEE_TYPE.EIP1559:
          return await this.etherService.sendTransaction(selectedNetwork, wallet.privateKey, {
            chainId: network.chainId,
            maxFeePerGas: gasFeeInfo.baseFee.plus(gasFeeInfo.tip!).toString(10),
            maxPriorityFeePerGas: gasFeeInfo.tip!.toString(10),
            gasLimit: gasFeeInfo.gas.toString(10),
            to,
            value: value ? value.toString(10) : undefined,
            data,
          });
        case NETWORK_FEE_TYPE.EVM_LEGACY_GAS:
          return await this.etherService.sendTransaction(selectedNetwork, wallet.privateKey, {
            chainId: network.chainId,
            gasPrice: BnToEtherBn(gasFeeInfo.baseFee),
            gasLimit: BnToEtherBn(gasFeeInfo.gas),
            to,
            value: value ? BnToEtherBn(value) : undefined,
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
