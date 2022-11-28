import { injectable, inject } from 'tsyringe';

import '@ethersproject/shims';
import { NETWORK_INFO } from '@@components/BasicComponents/GasFeeBoard/testNetworkEnv';
import { Network, EIP_1559_SUPPORT_NETWORK, TEZOS_NETWORK } from '@@constants/network.constant';
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
    const networkInfo = NETWORK_INFO[selectedNetwork] as INetworkInfo;

    if (EIP_1559_SUPPORT_NETWORK.includes(selectedNetwork)) {
      return await this.gasRepositoryEip1559.getGasFeeData(networkInfo);
    } else if (TEZOS_NETWORK.includes(selectedNetwork)) {
      return null;
    } else {
      return await this.gasRepository.getGasFeeData(networkInfo);
    }
  };

  getTotalGasFee = (args: TGetTotalGasFeeArgsEthers | TGetTotalGasFeeArgsEIP1559 | TGetTotalGasFeeArgsTEZ) => {
    if (EIP_1559_SUPPORT_NETWORK.includes(args.selectedNetwork)) {
      const { maxFeePerGas, maxPriorityFeePerGas, estimatedGas, gasLevel } = args as TGetTotalGasFeeArgsEIP1559;
      return this.gasRepositoryEip1559.getTotalGasFee({
        maxFeePerGas,
        maxPriorityFeePerGas,
        estimatedGas,
        gasLevel,
      });
    } else if (TEZOS_NETWORK.includes(args.selectedNetwork)) {
      const { baseFee, additionalFee, gasLevel } = args as TGetTotalGasFeeArgsTEZ;
      return this.gasRepositoryTezos.getTotalGasFee({ baseFee, additionalFee, gasLevel });
    } else {
      const { gasPrice, gasLimit, gasLevel } = args as TGetTotalGasFeeArgsEthers;
      return this.gasRepository.getTotalGasFee({ gasPrice, gasLimit, gasLevel });
    }
  };

  getEstimateTime = (gasLevel: TGasLevel) => {
    return GAS_LEVEL_SETTING[gasLevel].waitTime;
  };

  estimateGas = async (args: TEstimateGasArgs | TEstimateGasArgsTEZ) => {
    const networkInfo = NETWORK_INFO[args.selectedNetwork] as INetworkInfo;

    if (TEZOS_NETWORK.includes(args.selectedNetwork)) {
      const { to, amount, privateKey } = args as TEstimateGasArgsTEZ;
      return await this.gasRepositoryTezos.estimateGas({ rpcUrl: networkInfo.rpcUrl, to, amount, privateKey });
    } else {
      const { to, value, privateKey } = args as TEstimateGasArgs;
      return await this.gasRepository.estimateGas({ networkInfo, to, value, privateKey });
    }
  };
}
