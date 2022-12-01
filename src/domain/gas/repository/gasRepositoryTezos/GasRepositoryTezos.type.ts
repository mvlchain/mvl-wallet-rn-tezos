import { Estimate, TransferParams } from '@taquito/taquito';

import { TGasLevel } from '@@domain/gas/GasService.type';
export interface IGetTotalGasFeeArgsTEZ {
  gasLevel?: TGasLevel;
  baseFee: number;
  additionalFee?: number;
}

export interface IEstimateGasArgsTEZ extends TransferParams {
  rpcUrl: string;
}

export interface IGasRepositoryTezos {
  getTotalGasFee: (args: IGetTotalGasFeeArgsTEZ) => string;
  estimateGas: (args: IEstimateGasArgsTEZ) => Promise<Estimate>;
}
