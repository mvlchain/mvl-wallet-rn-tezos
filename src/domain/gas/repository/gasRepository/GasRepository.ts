import { injectable } from 'tsyringe';
import '@ethersproject/shims';
import { BigNumber, ethers } from 'ethers';

import { GAS_LEVEL_SETTING } from '@@constants/transaction.constant';
import { TGasLevel } from '@@domain/gas/GasService.type';
import { INetworkInfo } from '@@domain/transaction/TransactionService.type';

import { IEstimateGasArgs, IGasRepository, IGetTotalGasFeeArgsEthers } from './GasRepository.type';

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

  //Total = gasPrice * gasLimit
  getTotalGasFee = ({ gasPrice, gasLimit, gasLevel }: IGetTotalGasFeeArgsEthers) => {
    const gasWeight = gasLevel ? GAS_LEVEL_SETTING[gasLevel].weight : '1';
    const gasPriceInDecimal = new Decimal(gasPrice.toString());
    const gasLimitInDecimal = new Decimal(gasLimit.toString());

    const totalGas = gasPriceInDecimal.mul(gasWeight).mul(gasLimitInDecimal);
    const totalGasInBN = BigNumber.from(BigInt(Math.floor(totalGas.toNumber())));

    return formatEther(totalGasInBN);
  };

  estimateGas = async (args: IEstimateGasArgs) => {
    const { networkInfo, privateKey, to, value, data } = args;
    const provider = new ethers.providers.JsonRpcProvider(networkInfo.rpcUrl);
    const wallet = new ethers.Wallet(privateKey, provider);

    const res = await wallet.estimateGas({
      to,
      data,
      value,
    });

    return res as BigNumber;
  };
}
