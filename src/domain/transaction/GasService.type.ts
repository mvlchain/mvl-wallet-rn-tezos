import { BigNumber } from 'ethers';

import { GAS_LEVEL } from '@@constants/transaction.constant';

import { IGasFeeInfo, INetworkInfo } from './TransactionService.type';
export interface IEIP1559GasFeeInfo {
  maxFeePerGas: BigNumber | null;
  maxPriorityFeePerGas: BigNumber | null;
  gasPrice: BigNumber | null;
  gasLimit: BigNumber;
}

export type TGasLevel = typeof GAS_LEVEL[keyof typeof GAS_LEVEL];

export interface IGetTotalGasFeeArguments {
  gasLevel?: TGasLevel;
  gasPrice: BigNumber;
  gasLimit: BigNumber;
}

export interface IGetTotalGasFeeArgumentsEIP1559 {
  gasLevel?: TGasLevel;
  maxFeePerGas: BigNumber;
  estimatedGas: BigNumber;
  maxPriorityFeePerGas: BigNumber;
}
export interface IGasService {
  getGasFeeData: (networkInfo: INetworkInfo) => Promise<IGasFeeInfo>;
  getEIP1559GasFeeData: (networkInfo: INetworkInfo) => Promise<IEIP1559GasFeeInfo>;
  getTotalGasFee: (args: IGetTotalGasFeeArguments) => string;
  getTotalGasFee_EIP1559: (args: IGetTotalGasFeeArgumentsEIP1559) => string;
  getEstimateTime: (gasLevel: TGasLevel) => number;
}
