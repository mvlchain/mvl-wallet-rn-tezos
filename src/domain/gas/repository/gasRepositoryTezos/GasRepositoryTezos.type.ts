import { Estimate, TransferParams } from '@taquito/taquito';

export interface IGetTotalGasFeeParamsTEZ {
  estimatedGas: number;
  tip: number;
}

export interface IEstimateGasParamsTEZ extends TransferParams {
  rpcUrl: string;
}

export interface IGasRepositoryTezos {
  getTotalGasFee: (args: IGetTotalGasFeeParamsTEZ) => string;
  estimateGas: (args: IEstimateGasParamsTEZ) => Promise<Estimate>;
}
