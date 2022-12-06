import { BigNumber, BytesLike } from 'ethers';

import { Network } from '@@constants/network.constant';
import { GAS_LEVEL } from '@@constants/transaction.constant';

export type TGasLevel = typeof GAS_LEVEL[keyof typeof GAS_LEVEL];
export type TSelectedNetwork = { selectedNetwork: Network };

export interface IGasFeeInfo {
  baseFee: BigNumber;
  tip?: BigNumber;
  gasLimit: BigNumber;
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
  to?: string;
  value?: BigNumber;
  contractAddress?: string;
  data?: BytesLike;
}

export interface IGasService {
  getGasFeeData: (selectedNetwork: Network) => Promise<
    | {
        baseFee?: BigNumber | null;
        enableTip: boolean;
        enableLimitCustom: boolean;
        gasLimit?: BigNumber | null;
        maxBaseFee?: BigNumber | null;
        maxTip?: BigNumber | null;
        maxGasLimit?: BigNumber | null;
      }
    | undefined
  >;

  getTotalGasFee: ({ selectedNetwork, baseFee, tip, estimatedGas, gasLimit }: IGetTotalGasFeeRequest) => string;

  getEstimateTime: (gasLevel: TGasLevel) => number;

  estimateGas: (args: IEstimateGasRequest) => Promise<BigNumber>;
}
