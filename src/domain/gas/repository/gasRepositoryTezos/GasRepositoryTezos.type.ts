import { Estimate, TransferParams } from '@taquito/taquito';
import { BigNumber } from 'bignumber.js';
export interface IEstimateGasParamsTEZ {
  rpcUrl: string;
  walletPrivateKey: string;
  param: TransferParams;
}

export interface IGasRepositoryTezos {
  estimateGas: (args: IEstimateGasParamsTEZ) => Promise<Estimate | undefined>;
}
