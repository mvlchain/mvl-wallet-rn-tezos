import { TransactionRequest } from '@ethersproject/abstract-provider';
import { BigNumber } from 'ethers';

import { INetworkInfo } from '@@domain/transaction/TransactionService.type';

import { TGasLevel } from '../../GasService.type';
export interface IGasFeeInfo {
  gasPrice: BigNumber;
  gasLimit: BigNumber;
}

export interface IGetTotalGasFeeArgsEthers {
  gasLevel?: TGasLevel;
  gasPrice: BigNumber;
  gasLimit: BigNumber;
}

export interface IEstimateGasArgs extends TransactionRequest {
  networkInfo: INetworkInfo;
}

export interface IGasRepository {
  getGasFeeData: (networkInfo: INetworkInfo) => Promise<IGasFeeInfo>;
  getTotalGasFee: (args: IGetTotalGasFeeArgsEthers) => string;
  estimateGas: (args: IEstimateGasArgs) => Promise<BigNumber>;
}
