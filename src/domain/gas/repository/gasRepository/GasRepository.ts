import { injectable } from 'tsyringe';
import '@ethersproject/shims';
import { BigNumber, ethers } from 'ethers';

import { GAS_LEVEL_SETTING } from '@@constants/transaction.constant';
import { TGasLevel } from '@@domain/gas/GasService.type';
import { INetworkInfo } from '@@domain/transaction/TransactionService.type';

import { IEstimateGasParams, IGasRepository, IGetTotalGasFeeParamsEthers } from './GasRepository.type';

import Decimal from 'decimal.js';
import { formatEther } from 'ethers/lib/utils';

@injectable()
export class GasRepositoryImpl implements IGasRepository {
  getGasFeeData = async (networkInfo: INetworkInfo) => {
    const provider = new ethers.providers.JsonRpcProvider(networkInfo.rpcUrl);
    const block = await provider.getBlock('latest');
    const gasLimit = block.gasLimit;
    const gasPrice = await provider.getGasPrice();
    return { gasLimit, gasPrice };
  };

  getTotalGasFee = ({ baseFee, gasLevel, estimatedGas }: IGetTotalGasFeeParamsEthers) => {
    const gasWeight = gasLevel ? GAS_LEVEL_SETTING[gasLevel].weight : '1';
    const baseFeeInDecimal = new Decimal(baseFee.toString());
    const estimatedGasInDecimal = new Decimal(estimatedGas.toString());

    const totalGas = baseFeeInDecimal.mul(gasWeight).mul(estimatedGasInDecimal);
    const totalGasInBN = BigNumber.from(BigInt(Math.floor(totalGas.toNumber())));

    return formatEther(totalGasInBN);
  };

  estimateGas = async (args: IEstimateGasParams) => {
    const { networkInfo, to, value, data } = args;
    const provider = new ethers.providers.JsonRpcProvider(networkInfo.rpcUrl);

    const res = await provider.estimateGas({
      to,
      data,
      value,
    });

    return res as BigNumber;
  };
}
