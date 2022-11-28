import { BigNumber } from 'ethers';

import { Network } from '@@constants/network.constant';
import { GAS_LEVEL } from '@@constants/transaction.constant';
import { INetworkInfo } from '@@domain/transaction/TransactionService.type';

import { IGasFeeInfo, IGetTotalGasFeeArgumentsEthers } from './repository/gasRepository/GasRepository.type';
import { IGasFeeInfoEip1559, IGetTotalGasFeeArgumentsEIP1559 } from './repository/gasRepositoryEip1559/GasRepositoryEip1559.type';
import { IGetTotalGasFeeArgumentsTezos } from './repository/gasRepositoryTezos/GasRepositoryTezos.type';
export type TGasLevel = typeof GAS_LEVEL[keyof typeof GAS_LEVEL];

export type TGetTotalGasFeeArguments = IGetTotalGasFeeArgumentsEthers | IGetTotalGasFeeArgumentsEIP1559 | IGetTotalGasFeeArgumentsTezos;
export type TGasFeeData = IGasFeeInfo | IGasFeeInfoEip1559 | null;
export interface IGasService {
  getGasFeeData: (selectedNetwork: Network) => Promise<TGasFeeData>;

  getTotalGasFee: (args: TGetTotalGasFeeArguments) => string;

  getEstimateTime: (gasLevel: TGasLevel) => number;

  estimateGas: () => Promise<void>;
}
