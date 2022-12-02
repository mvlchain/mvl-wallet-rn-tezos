import { injectable, inject } from 'tsyringe';

import '@ethersproject/shims';
import { NETWORK_FEE_TYPE, getNetworkConfig, Network } from '@@constants/network.constant';
import { GAS_LEVEL_SETTING } from '@@constants/transaction.constant';
import { INetworkInfo } from '@@domain/transaction/TransactionService.type';

import {
  IGasService,
  TGasLevel,
  TGetTotalGasFeeArgsEthers,
  TGetTotalGasFeeArgsEIP1559,
  TGetTotalGasFeeArgsTEZ,
  TEstimateGasArgs,
  TEstimateGasArgsTEZ,
} from './GasService.type';
import { GasRepositoryImpl } from './repository/gasRepository/GasRepository';
import { IGetTotalGasFeeArgsEthers } from './repository/gasRepository/GasRepository.type';
import { GasRepositoryEip1559Impl } from './repository/gasRepositoryEip1559/GasRepositoryEIP1559';
import { IGetTotalGasFeeArgsEIP1559 } from './repository/gasRepositoryEip1559/GasRepositoryEip1559.type';
import { GasRepositoryTezosImpl } from './repository/gasRepositoryTezos/GasRepositoryTezos';
import { IGetTotalGasFeeArgsTEZ } from './repository/gasRepositoryTezos/GasRepositoryTezos.type';

import { Estimate } from '@taquito/taquito';
import { BigNumber } from 'ethers';
@injectable()
export class GasServiceImpl implements IGasService {
  constructor(
    @inject('GasRepository') private gasRepository: GasRepositoryImpl,
    @inject('GasRepositoryEip1559') private gasRepositoryEip1559: GasRepositoryEip1559Impl,
    @inject('GasRepositoryTezos') private gasRepositoryTezos: GasRepositoryTezosImpl
  ) {}

  getGasFeeData = async (selectedNetwork: Network) => {
    const network = getNetworkConfig(selectedNetwork);

    switch (network.networkFeeType) {
      case NETWORK_FEE_TYPE.TEZOS:
        return null;
      case NETWORK_FEE_TYPE.EIP1559:
        return await this.gasRepositoryEip1559.getGasFeeData({ rpcUrl: network.rpcUrl, chainId: network.chainId });
      default:
        return await this.gasRepository.getGasFeeData({ rpcUrl: network.rpcUrl, chainId: network.chainId });
    }
  };

  getTotalGasFee = (args: TGetTotalGasFeeArgsEthers | TGetTotalGasFeeArgsEIP1559 | TGetTotalGasFeeArgsTEZ) => {
    const network = getNetworkConfig(args.selectedNetwork);

    if (network.networkFeeType === NETWORK_FEE_TYPE.TEZOS) {
      const { baseFee, additionalFee, gasLevel } = args as IGetTotalGasFeeArgsTEZ;
      return this.gasRepositoryTezos.getTotalGasFee({ baseFee, additionalFee, gasLevel });
    } else if (network.networkFeeType === NETWORK_FEE_TYPE.EIP1559) {
      const { maxFeePerGas, maxPriorityFeePerGas, estimatedGas, gasLevel } = args as IGetTotalGasFeeArgsEIP1559;
      return this.gasRepositoryEip1559.getTotalGasFee({
        maxFeePerGas,
        maxPriorityFeePerGas,
        estimatedGas,
        gasLevel,
      });
    } else {
      const { gasPrice, gasLimit, gasLevel } = args as IGetTotalGasFeeArgsEthers;
      return this.gasRepository.getTotalGasFee({ gasPrice, gasLimit, gasLevel });
    }
  };

  getEstimateTime = (gasLevel: TGasLevel) => {
    return GAS_LEVEL_SETTING[gasLevel].waitTime;
  };

  estimateGas = async (args: TEstimateGasArgs | TEstimateGasArgsTEZ) => {
    const network = getNetworkConfig(args.selectedNetwork);
    if (network.networkFeeType === NETWORK_FEE_TYPE.TEZOS) {
      const { to, amount } = args as TEstimateGasArgsTEZ;
      return await this.gasRepositoryTezos.estimateGas({ rpcUrl: network.rpcUrl, to, amount });
    } else {
      const { to, value } = args as TEstimateGasArgs;
      return await this.gasRepository.estimateGas({ networkInfo: { rpcUrl: network.rpcUrl, chainId: network.chainId }, to, value });
    }
  };
}
