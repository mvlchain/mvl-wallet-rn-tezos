import { BigNumber } from 'ethers';

import { GAS_LEVEL } from '@@constants/transaction.constant';
import { TGasLevel } from '@@domain/gas/GasService.type';
import { INetworkInfo } from '@@domain/transaction/TransactionService.type';

export interface IGetTotalGasFeeArgumentsTezos {
  gasLevel?: TGasLevel;
  baseFee: number;
  additionalFee?: number;
}
export interface IGasRepositoryTezos {
  getTotalGasFee: (args: IGetTotalGasFeeArgumentsTezos) => string;
}
