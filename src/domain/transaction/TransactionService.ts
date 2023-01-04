import { TransferParams } from '@taquito/taquito';
import { BigNumber } from 'bignumber.js';
import { BigNumber as BigNumberEther, ethers } from 'ethers';
import qs from 'qs';
import { inject, injectable } from 'tsyringe';

import appconfig from '@@config/appconfig';
import { abiERC20 } from '@@constants/contract/abi/abiERC20';
import { getNetworkConfig, NETWORK_FEE_TYPE, Network, COIN_DTO, NETWORK_ID } from '@@constants/network.constant';
import { WalletService } from '@@domain/wallet/services/WalletService';
import { RefreshTransactionResponseDto } from '@@generated/generated-scheme-clutch';
import { BnToEtherBn, formatBigNumber } from '@@utils/formatBigNumber';
import { request } from '@@utils/request';

import {
  ITransactionService,
  IGetHistoryParams,
  ISendTransactionRequest,
  IRegisterTransactionRequest,
  IHistoryParams,
  IGetTransferData,
} from './TransactionService.type';
import { ITransactionServiceEthers } from './service/transactionServiceEthers/TransactionServiceEthers.type';
import { ITransactionServiceTezos } from './service/transactionServiceTezos/TransactionServiceTezos.type';
@injectable()
export class TransactionService implements ITransactionService {
  constructor(
    @inject('TransactionServiceEthers') private etherService: ITransactionServiceEthers,
    @inject('TransactionServiceTezos') private tezosService: ITransactionServiceTezos,
    @inject('WalletService') private walletService: WalletService
  ) {}

  getTransferData = async ({ selectedNetwork, selectedWalletIndex, to, value, contractAddress, decimals }: IGetTransferData) => {
    try {
      const network = getNetworkConfig(selectedNetwork);
      const wallet = await this.walletService.getWalletInfo({ index: selectedWalletIndex, network: selectedNetwork });

      switch (network.networkFeeType) {
        case NETWORK_FEE_TYPE.TEZOS:
          if (!contractAddress || !decimals) {
            throw new Error('contractAddress and decimals is required in tezos');
          }
          const amount = value.toNumber();
          return this.tezosService.getTransferData(selectedNetwork, wallet.privateKey, wallet.address, to, amount, contractAddress);
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
          if (!gasFeeInfo.tip || !gasFeeInfo.total) {
            throw new Error('gasFeeInfo is required');
          }
          if (data) {
            //fee unit mutez, amount unit tez, so only amount use formatBigNumber
            const transferParams: TransferParams = JSON.parse(data as string);
            return await this.tezosService.sendTransaction(selectedNetwork, wallet.privateKey, {
              ...transferParams,
              fee: gasFeeInfo.total.toNumber(),
            });
          } else {
            if (!value || !to) {
              throw new Error('value,to is required');
            }
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

  getNonce = async (selectedNetwork: Network, hash: string) => {
    try {
      const network = getNetworkConfig(selectedNetwork);
      switch (network.networkId) {
        case NETWORK_ID.ETHEREUM:
          return await this.etherService.getTransaction(selectedNetwork, hash);
        case NETWORK_ID.BSC:
          return await this.etherService.getTransaction(selectedNetwork, hash);
        case NETWORK_ID.XTZ:
          //TODO: register history 할때 해당 api를 사용하는데,
          //테조스 서버요청외에 따로 해시로 트랜잭션정보를 조회할 수 있는 api를 타퀴토에서 찾지 못하였음
          //테조스의 경우 nonce값이 0으로 가도 문제가 없으며, tranasaction refresh시 재반영 되므로 일단 0으로 할당한다.
          //sendtransaction 이후에 값을 가져오는 방법도 있긴하지만
          // 그렇게 작업할 경우 이더와 테조스 각 sendTransaction의 return값이 통일되지 못하는것 같아 고민임
          return 0;
      }
    } catch (err) {
      console.log(err);
    }
  };
}
