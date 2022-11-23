import { BigNumber } from 'ethers';

import { GAS_LEVEL } from '@@constants/transaction.constant';

import { IGasFeeInfo, INetworkInfo } from './TransactionService.type';
export interface IEIP1559GasFeeInfo {
  maxFeePerGas: BigNumber | null;
  maxPriorityFeePerGas: BigNumber | null;
  gasPrice: BigNumber | null;
  gasLimit: BigNumber;
}
export interface IGasService {
  getGasFeeData: (networkInfo: INetworkInfo) => Promise<IGasFeeInfo>;
  getEIP1559GasFeeData: (networkInfo: INetworkInfo) => Promise<IEIP1559GasFeeInfo>;
}

export type TGasLevel = typeof GAS_LEVEL[keyof typeof GAS_LEVEL];
