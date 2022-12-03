import { injectable, inject } from 'tsyringe';

import '@ethersproject/shims';
import { NETWORK_FEE_TYPE, getNetworkConfig, Network } from '@@constants/network.constant';
import { GAS_LEVEL_SETTING } from '@@constants/transaction.constant';
import { INetworkInfo } from '@@domain/transaction/TransactionService.type';

import { IGasService, TGasLevel } from './GasService.type';
import { GasRepositoryImpl } from './repository/gasRepository/GasRepository';
import { IGetTotalGasFeeParamsEthers } from './repository/gasRepository/GasRepository.type';
import { GasRepositoryEip1559Impl } from './repository/gasRepositoryEip1559/GasRepositoryEIP1559';
import { IGetTotalGasFeeParamsEIP1559 } from './repository/gasRepositoryEip1559/GasRepositoryEip1559.type';
import { GasRepositoryTezosImpl } from './repository/gasRepositoryTezos/GasRepositoryTezos';
import { IGetTotalGasFeeParamsTEZ } from './repository/gasRepositoryTezos/GasRepositoryTezos.type';

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
        return { enableTip: true, enableLimitCustom: false };
      case NETWORK_FEE_TYPE.EIP1559:
        const gasFeeDataEip1559 = await this.gasRepositoryEip1559.getGasFeeData({ rpcUrl: network.rpcUrl, chainId: network.chainId });

        return {
          baseFee: gasFeeDataEip1559.lastBaseFeePerGas,
          enableTip: true,
          enableLimitCustom: true,
          gasLimit: gasFeeDataEip1559.gasLimit,
          maxBaseFee: gasFeeDataEip1559.maxFeePerGas,
          maxTip: gasFeeDataEip1559.maxPriorityFeePerGas,
        };

      default:
        const gasFeeData = await this.gasRepository.getGasFeeData({ rpcUrl: network.rpcUrl, chainId: network.chainId });
        return {
          baseFee: gasFeeData.gasPrice,
          enableTip: false,
          enableLimitCustom: true,
          gasLimit: gasFeeData.gasLimit,
        };
    }
  };

  getTotalGasFee = ({
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
  }) => {
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

  estimateGas = async ({ selectedNetwork, to, value }: { selectedNetwork: Network; to: string; value: BigNumber }) => {
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
