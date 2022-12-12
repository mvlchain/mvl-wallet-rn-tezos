import { Estimate, TransferParams } from '@taquito/taquito';
import { BigNumber } from 'ethers';

export interface IGetTotalGasFeeParamsTEZ {
  estimatedGas: BigNumber;
  tip: BigNumber;
  baseFee: BigNumber;
}

export interface IEstimateGasParamsTEZ extends TransferParams {
  rpcUrl: string;
  walletPrivateKey: string;
}

export interface IGasRepositoryTezos {
  getTotalGasFee: (args: IGetTotalGasFeeParamsTEZ) => string;
  estimateGas: (args: IEstimateGasParamsTEZ) => Promise<Estimate | undefined>;
}
