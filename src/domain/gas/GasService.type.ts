import { BigNumber, BytesLike } from 'ethers';

import { GAS_LEVEL } from '@@constants/gas.constant';
import { Network } from '@@constants/network.constant';

export type TGasLevel = typeof GAS_LEVEL[keyof typeof GAS_LEVEL];
export type TSelectedNetwork = { selectedNetwork: Network };

export interface IGasFeeInfo {
  baseFee: BigNumber;
  tip?: BigNumber;
  gasLimit: BigNumber;
  total: number;
}

export interface IGetTotalGasFeeRequest {
  selectedNetwork: Network;
  baseFee: BigNumber;
  tip?: BigNumber | null;
  estimatedGas?: BigNumber | null;
  gasLimit?: BigNumber | null;
}

export interface IEstimateGasRequest {
  selectedNetwork: Network;
  selectedWalletIndex: number;
  to: string;
  value?: BigNumber;
  data?: BytesLike;
}

export interface IEstimateGasResponse {
  baseFee?: BigNumber;
  gasUsage: BigNumber;
}

export interface IGetGasFeeResponse {
  baseFee?: BigNumber | null;
  enableTip: boolean;
  enableLimitCustom: boolean;
  gasLimit?: BigNumber | null;
  maxBaseFee?: BigNumber | null;
  maxTip?: BigNumber | null;
  maxGasLimit?: BigNumber | null;
}
export interface IGasService {
  getGasFeeData: (selectedNetwork: Network) => Promise<IGetGasFeeResponse | undefined>;
  getTotalGasFee: ({ selectedNetwork, baseFee, tip, estimatedGas, gasLimit }: IGetTotalGasFeeRequest) => string | undefined;
  estimateGas: (args: IEstimateGasRequest) => Promise<IEstimateGasResponse | undefined>;
}
