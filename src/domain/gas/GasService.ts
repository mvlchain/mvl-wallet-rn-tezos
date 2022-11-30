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
import { GasRepositoryEip1559Impl } from './repository/gasRepositoryEip1559/GasRepositoryEIP1559';
import { GasRepositoryTezosImpl } from './repository/gasRepositoryTezos/GasRepositoryTezos';
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

    switch (network.networkFeeType) {
      case NETWORK_FEE_TYPE.TEZOS:
        const { baseFee, additionalFee, gasLevel } = args as TGetTotalGasFeeArgsTEZ;
        return this.gasRepositoryTezos.getTotalGasFee({ baseFee, additionalFee, gasLevel });
      case NETWORK_FEE_TYPE.EIP1559:
        const { maxFeePerGas, maxPriorityFeePerGas, estimatedGas, gasLevel } = args as TGetTotalGasFeeArgsEIP1559;
        return this.gasRepositoryEip1559.getTotalGasFee({
          maxFeePerGas,
          maxPriorityFeePerGas,
          estimatedGas,
          gasLevel,
        });
      default:
        const { gasPrice, gasLimit, gasLevel } = args as TGetTotalGasFeeArgsEthers;
        return this.gasRepository.getTotalGasFee({ gasPrice, gasLimit, gasLevel });
    }
  };

  getEstimateTime = (gasLevel: TGasLevel) => {
    return GAS_LEVEL_SETTING[gasLevel].waitTime;
  };

  estimateGas = async (args: TEstimateGasArgs | TEstimateGasArgsTEZ) => {
    const network = getNetworkConfig(args.selectedNetwork);

    switch (network.networkFeeType) {
      case NETWORK_FEE_TYPE.TEZOS:
        const { to, amount, privateKey } = args as TEstimateGasArgsTEZ;
        return await this.gasRepositoryTezos.estimateGas({ rpcUrl: network.rpcUrl, to, amount, privateKey });
      default:
        const { to, value, privateKey } = args as TEstimateGasArgs;
        return await this.gasRepository.estimateGas({ network, to, value, privateKey });
    }
  };
}
