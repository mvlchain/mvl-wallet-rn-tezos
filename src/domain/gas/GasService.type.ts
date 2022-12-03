import { Estimate } from '@taquito/taquito';
import { BigNumber } from 'ethers';

import { Network, NETWORK } from '@@constants/network.constant';
import { GAS_LEVEL } from '@@constants/transaction.constant';

import { IEstimateGasArgs, IGasFeeInfo, IGetTotalGasFeeArgsEthers } from './repository/gasRepository/GasRepository.type';
import { IGasFeeInfoEip1559, IGetTotalGasFeeArgsEIP1559 } from './repository/gasRepositoryEip1559/GasRepositoryEip1559.type';
import { IEstimateGasArgsTEZ, IGetTotalGasFeeArgsTEZ } from './repository/gasRepositoryTezos/GasRepositoryTezos.type';

export type TGasLevel = typeof GAS_LEVEL[keyof typeof GAS_LEVEL];
export type TSelectedNetwork = { selectedNetwork: Network };

export type TGetTotalGasFeeArgsEthers = IGetTotalGasFeeArgsEthers & TSelectedNetwork;
export type TGetTotalGasFeeArgsEIP1559 = IGetTotalGasFeeArgsEIP1559 & TSelectedNetwork;
export type TGetTotalGasFeeArgsTEZ = IGetTotalGasFeeArgsTEZ & TSelectedNetwork;

export type TEstimateGasArgs = Omit<IEstimateGasArgs, 'networkInfo'> & TSelectedNetwork;
export type TEstimateGasArgsTEZ = Omit<IEstimateGasArgsTEZ, 'rpcUrl'> & TSelectedNetwork;
export interface IGasService {
  getGasFeeData: (selectedNetwork: Network) => Promise<{
    baseFee: BigNumber;
    enableTip: boolean;
    enableLimitCustom: boolean;
    gasLimit: BigNumber;
    maxBaseFee: BigNumber;
    maxTip?: BigNumber;
    maxGasLimit?: BigNumber;
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
    tip: BigNumber | null;
    estimatedGas: BigNumber;
    gasLevel?: TGasLevel;
  }) => string;

  getEstimateTime: (gasLevel: TGasLevel) => number;

  estimateGas: ({ selectedNetwork, to, value }: { selectedNetwork: Network; to: string; value: BigNumber }) => Promise<BigNumber>;
}
