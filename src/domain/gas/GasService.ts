import { injectable, inject } from 'tsyringe';
import '@ethersproject/shims';
import { BigNumber, ethers } from 'ethers';

import { NETWORK_INFO } from '@@components/BasicComponents/GasFeeBoard/testNetworkEnv';
import { Network, EIP_1559_SUPPORT_NETWORK, TEZOS_NETWORK, ESTIMATE_TIME_SUPPORT_NETWORK } from '@@constants/network.constants';
import { GAS_LEVEL_SETTING } from '@@constants/transaction.constant';
import { INetworkInfo } from '@@domain/transaction/TransactionService.type';

import { IGasService, TGasLevel } from './GasService.type';

import Decimal from 'decimal.js';
import { formatEther } from 'ethers/lib/utils';

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
    const networkInfo = NETWORK_INFO[selectedNetwork];
    switch (selectedNetwork) {
      case EIP_1559_SUPPORT_NETWORK.includes(selectedNetwork):
        return await this.gasRepositoryEip1559.getGasFeeData(networkInfo);
      case TEZOS_NETWORK.includes(selectedNetwork):
        return null;
      default:
        return await this.gasRepository.getGasFeeData(networkInfo);
    }
  };

  getTotalGasFee = ({ gasPrice, gasLimit, gasLevel }: IGetTotalGasFeeArguments) => {
    return '-';
  };

  getEstimateTime = (gasLevel: TGasLevel) => {
    return GAS_LEVEL_SETTING[gasLevel].waitTime;
  };

  estimateGas = async () => {};
}
