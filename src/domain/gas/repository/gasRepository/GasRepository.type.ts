import { BigNumber } from 'ethers';

import { INetworkInfo } from '@@domain/transaction/TransactionService.type';

import { TGasLevel } from '../../GasService.type';

export interface IGasFeeInfo {
  gasPrice: BigNumber;
  gasLimit: BigNumber;
}

export interface IGetTotalGasFeeArgumentsEthers {
  gasLevel?: TGasLevel;
  gasPrice: BigNumber;
  gasLimit: BigNumber;
}

export interface IGasRepository {
  getGasFeeData: (networkInfo: INetworkInfo) => Promise<IGasFeeInfo>;
  getTotalGasFee: (args: IGetTotalGasFeeArgumentsEthers) => string;
}
