import { TransactionRequest } from '@ethersproject/abstract-provider';
import { BigNumber } from 'ethers';

import { INetworkInfo } from '@@domain/transaction/TransactionService.type';

export interface IGasFeeInfoEthers {
  gasPrice: BigNumber;
  gasLimit: BigNumber;
}

export interface IGetTotalGasFeeParamsEthers {
  baseFee: BigNumber;
  gasLimit: BigNumber;
}

export interface IGasRepository {
  getGasFeeData: (networkInfo: INetworkInfo) => Promise<IGasFeeInfoEthers>;
  getTotalGasFee: (args: IGetTotalGasFeeParamsEthers) => string;
  estimateGas: (networkInfo: INetworkInfo, args: TransactionRequest) => Promise<BigNumber>;
}