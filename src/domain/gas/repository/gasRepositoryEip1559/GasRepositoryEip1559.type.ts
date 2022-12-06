import { BigNumber } from 'ethers';

import { TGasLevel } from '@@domain/gas/GasService.type';
import { INetworkInfo } from '@@domain/transaction/TransactionService.type';

export interface IGasFeeInfoEip1559 {
  maxFeePerGas: BigNumber | null;
  maxPriorityFeePerGas: BigNumber | null;
  lastBaseFeePerGas?: BigNumber | null;
  gasPrice?: BigNumber | null;
  gasLimit: BigNumber;
}

export interface IGetTotalGasFeeParamsEIP1559 {
  baseFee: BigNumber;
  estimatedGas: BigNumber;
  tip: BigNumber;
}

export interface IGasRepositoryEip1559 {
  getGasFeeData: (networkInfo: INetworkInfo) => Promise<IGasFeeInfoEip1559>;
  getTotalGasFee: (args: IGetTotalGasFeeParamsEIP1559) => string;
}
