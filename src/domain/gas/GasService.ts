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
        return this.gasRepositoryTezos.getTotalGasFee({ baseFee: args.baseFee, additionalFee: args.additionalFee, gasLevel: args.gasLevel });
      case NETWORK_FEE_TYPE.EIP1559:
        return this.gasRepositoryEip1559.getTotalGasFee({
          maxFeePerGas: args.maxFeePerGas,
          maxPriorityFeePerGas: args.maxPriorityFeePerGas,
          estimatedGas: args.estimatedGas,
          gasLevel: args.gasLevel,
        });
      default:
        return this.gasRepository.getTotalGasFee({ gasPrice: args.gasPrice, gasLimit: args.gasLimit, gasLevel: args.gasLevel });
    }
  };

  getEstimateTime = (gasLevel: TGasLevel) => {
    return GAS_LEVEL_SETTING[gasLevel].waitTime;
  };

  estimateGas = async (args: TEstimateGasArgs | TEstimateGasArgsTEZ) => {
    const network = getNetworkConfig(args.selectedNetwork);
    const { to, value, amount, privateKey } = args;
    switch (network.networkFeeType) {
      case NETWORK_FEE_TYPE.TEZOS:
        return await this.gasRepositoryTezos.estimateGas({ rpcUrl: network.rpcUrl, to, amount, privateKey });
      default:
        return await this.gasRepository.estimateGas({ networkInfo: { rpcUrl: network.rpcUrl, chainId: network.chainId }, to, value, privateKey });
    }
  };
}
