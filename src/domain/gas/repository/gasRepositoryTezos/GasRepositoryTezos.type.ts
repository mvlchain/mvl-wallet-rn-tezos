import { Estimate, TransferParams } from '@taquito/taquito';
import { BigNumber } from 'bignumber.js';

export interface IGetTotalGasFeeParamsTEZ {
  tip: BigNumber;
  baseFee: BigNumber;
}

export interface IEstimateGasParamsTEZ extends TransferParams {
  rpcUrl: string;
  walletPrivateKey: string;
}

export interface IGasRepositoryTezos {
  getTotalGasFee: (args: IGetTotalGasFeeParamsTEZ) => BigNumber;
  estimateGas: (args: IEstimateGasParamsTEZ) => Promise<Estimate | undefined>;
}
