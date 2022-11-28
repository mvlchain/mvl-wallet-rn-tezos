import { BigNumber } from 'ethers';

import { GAS_LEVEL } from '@@constants/transaction.constant';
import { TGasLevel } from '@@domain/gas/GasService.type';
import { INetworkInfo } from '@@domain/transaction/TransactionService.type';

export interface IGasFeeInfoEip1559 {
  maxFeePerGas: BigNumber | null;
  maxPriorityFeePerGas: BigNumber | null;
  lastBaseFeePerGas?: BigNumber | null;
  gasPrice?: BigNumber | null;
  gasLimit: BigNumber;
}

export interface IGetTotalGasFeeArgumentsEIP1559 {
  gasLevel?: TGasLevel;
  maxFeePerGas: BigNumber;
  estimatedGas: BigNumber;
  maxPriorityFeePerGas: BigNumber;
}
export interface IGasRepositoryEip1559 {
  getGasFeeData: (networkInfo: INetworkInfo) => Promise<IGasFeeInfoEip1559>;
  getTotalGasFee: (args: IGetTotalGasFeeArgumentsEIP1559) => string;
}
