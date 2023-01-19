import qs from 'qs';
import { inject, injectable } from 'tsyringe';

import appconfig from '@@config/appconfig';
import { RefreshTransactionResponseDto } from '@@generated/generated-scheme-clutch';
import { request } from '@@utils/request';

import { ITransactionHistoryRepository, IGetHistoryParams, IRegisterTransactionRequest, IHistoryParams } from './TransactionHistoryRepository.type';
@injectable()
export class TransactionHistoryRepository implements ITransactionHistoryRepository {
  constructor() {}
  // sendTransaction = async ({ selectedNetwork, selectedWalletIndex, gasFeeInfo, to, value, data }: ISendTransactionRequest) => {
  //   try {
  //     const network = getNetworkConfig(selectedNetwork);
  //     const wallet = await this.walletService.getWalletInfo({ index: selectedWalletIndex, network: selectedNetwork });

  //     switch (network.networkFeeType) {
  //       case NETWORK_FEE_TYPE.TEZOS:
  //         if (!gasFeeInfo.tip || !gasFeeInfo.total) {
  //           throw new Error('gasFeeInfo is required');
  //         }
  //         if (data) {
  //           //fee unit mutez, amount unit tez, so only amount use formatBigNumber
  //           const transferParams: TransferParams = JSON.parse(data as string);
  //           return await this.tezosService.sendTransaction(selectedNetwork, wallet.privateKey, {
  //             ...transferParams,
  //             fee: gasFeeInfo.total.toNumber(),
  //           });
  //         } else {
  //           if (!value || !to) {
  //             throw new Error('value,to is required');
  //           }
  //           return await this.tezosService.sendTransaction(selectedNetwork, wallet.privateKey, {
  //             to,
  //             fee: gasFeeInfo.total.toNumber(),
  //             amount: +formatBigNumber(value, TEZOS_TOKEN_LIST[0].decimals).toString(10),
  //           });
  //         }
  //       case NETWORK_FEE_TYPE.EIP1559:
  //         console.log('>>sendTransaction service', gasFeeInfo, to, value, data);
  //         return await this.etherService.sendTransaction(selectedNetwork, wallet.privateKey, {
  //           chainId: network.chainId,
  //           maxFeePerGas: gasFeeInfo.baseFee.plus(gasFeeInfo.tip!).toFixed(0),
  //           maxPriorityFeePerGas: gasFeeInfo.tip!.toString(10),
  //           gasLimit: gasFeeInfo.gas.toString(10),
  //           to,
  //           value: value ? value.toString(10) : undefined,
  //           data: data ?? undefined,
  //         });
  //       case NETWORK_FEE_TYPE.EVM_LEGACY_GAS:
  //         return await this.etherService.sendTransaction(selectedNetwork, wallet.privateKey, {
  //           chainId: network.chainId,
  //           gasPrice: BnToEtherBn(gasFeeInfo.baseFee),
  //           gasLimit: BnToEtherBn(gasFeeInfo.gas),
  //           to,
  //           value: value ? BnToEtherBn(value) : undefined,
  //           data: data ?? undefined,
  //         });
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

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

  getSingleHistory = async (params: IHistoryParams) => {
    const endpoint = `/v1/transactions?${qs.stringify(params)}`;
    const res = await request.get<RefreshTransactionResponseDto>(endpoint);
    return res.data;
  };

  refreshHistory = async (params: IHistoryParams) => {
    const endpoint = `/v1/transactions/refresh?${qs.stringify(params)}`;
    const res = await request.get<RefreshTransactionResponseDto>(endpoint);
    return res.data;
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
