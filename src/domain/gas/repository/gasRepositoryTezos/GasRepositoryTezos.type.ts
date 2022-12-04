import { Estimate, TransferParams } from '@taquito/taquito';

import { TGasLevel } from '@@domain/gas/GasService.type';

export interface IGetTotalGasFeeParamsTEZ {
  gasLevel?: TGasLevel;
  estimatedGas: number;
  tip?: number;
}

export interface IEstimateGasParamsTEZ extends TransferParams {
  rpcUrl: string;
}

export interface IGasRepositoryTezos {
  getTotalGasFee: (args: IGetTotalGasFeeParamsTEZ) => string;
  estimateGas: (args: IEstimateGasParamsTEZ) => Promise<Estimate>;
}
