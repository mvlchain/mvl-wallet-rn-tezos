import { Estimate } from '@taquito/taquito';
import { BigNumber } from 'ethers';

import { Network, NETWORK } from '@@constants/network.constant';
import { GAS_LEVEL } from '@@constants/transaction.constant';
import { TokenDto } from '@@generated/generated-scheme-clutch';

export type TGasLevel = typeof GAS_LEVEL[keyof typeof GAS_LEVEL];
export type TSelectedNetwork = { selectedNetwork: Network };

export interface IGasFeeInfo {
  baseFee: BigNumber;
  tip?: BigNumber;
  gasLimit: BigNumber;
}
export interface IGasService {
  getGasFeeData: (selectedNetwork: Network) => Promise<{
    baseFee?: BigNumber | null;
    enableTip: boolean;
    enableLimitCustom: boolean;
    gasLimit?: BigNumber | null;
    maxBaseFee?: BigNumber | null;
    maxTip?: BigNumber | null;
    maxGasLimit?: BigNumber | null;
  }>;

  getTotalGasFee: ({
    selectedNetwork,
    baseFee,
    tip,
    estimatedGas,
    gasLevel,
  }: {
    selectedNetwork: Network;
    baseFee: BigNumber;
    tip?: BigNumber | null;
    estimatedGas: BigNumber;
    gasLevel?: TGasLevel;
  }) => string;

  getEstimateTime: (gasLevel: TGasLevel) => number;

  estimateGas: ({
    selectedNetwork,
    to,
    value,
    tokenDto,
    walletIndex,
  }: {
    selectedNetwork: Network;
    to: string;
    value: BigNumber;
    tokenDto: TokenDto;
    walletIndex: number;
  }) => Promise<BigNumber>;
}
