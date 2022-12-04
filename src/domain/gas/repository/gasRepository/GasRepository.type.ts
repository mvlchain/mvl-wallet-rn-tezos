import { TransactionRequest } from '@ethersproject/abstract-provider';
import { BigNumber } from 'ethers';

import { INetworkInfo } from '@@domain/transaction/TransactionService.type';

import { TGasLevel } from '../../GasService.type';
export interface IGasFeeInfoEthers {
  gasPrice: BigNumber;
  gasLimit: BigNumber;
}

export interface IGetTotalGasFeeParamsEthers {
  gasLevel?: TGasLevel;
  baseFee: BigNumber;
  estimatedGas: BigNumber;
}

export interface IEstimateGasParams extends TransactionRequest {
  networkInfo: INetworkInfo;
}

export interface IGasRepository {
  getGasFeeData: (networkInfo: INetworkInfo) => Promise<IGasFeeInfoEthers>;
  getTotalGasFee: (args: IGetTotalGasFeeParamsEthers) => string;
  estimateGas: (args: IEstimateGasParams) => Promise<BigNumber>;
}
