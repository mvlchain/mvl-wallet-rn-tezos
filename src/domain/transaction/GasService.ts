import { injectable } from 'tsyringe';
import '@ethersproject/shims';
import { BigNumber, ethers } from 'ethers';

import { GAS_LEVEL_SETTING } from '@@constants/transaction.constant';

import { IGasService, IGetTotalGasFeeArguments, IGetTotalGasFeeArgumentsEIP1559, TGasLevel } from './GasService.type';
import { INetworkInfo } from './TransactionService.type';

import Decimal from 'decimal.js';
import { formatEther } from 'ethers/lib/utils';

@injectable()
export class GasServiceImpl implements IGasService {
  getGasFeeData = async (networkInfo: INetworkInfo) => {
    const provider = new ethers.providers.JsonRpcProvider(networkInfo.rpcUrl);
    const block = await provider.getBlock('latest');
    const gasLimit = block.gasLimit;
    const gasPrice = await provider.getGasPrice();
    return { gasLimit, gasPrice };
  };
  getEIP1559GasFeeData = async (networkInfo: INetworkInfo) => {
    const provider = new ethers.providers.JsonRpcProvider(networkInfo.rpcUrl);
    const block = await provider.getBlock('latest');
    const gasLimit = block.gasLimit;
    const gasPrice = await provider.getFeeData();
    return { gasLimit, ...gasPrice };
  };
  //Total = gasPrice * gasLimit
  getTotalGasFee = ({ gasPrice, gasLimit, gasLevel }: IGetTotalGasFeeArguments) => {
    const gasWeight = gasLevel ? GAS_LEVEL_SETTING[gasLevel].weight : '1';
    const levelMultipliedGasPrice = BigNumber.from(new Decimal(gasPrice.toString()).mul(gasWeight).toString());
    const totalGas = levelMultipliedGasPrice.mul(gasLimit);
    return formatEther(totalGas);
  };
  //maxFeePerGas 자신이 최대로 허용할 수 있는 가스의 최대 가격, 사용한만큼 쓰고 돌려준다.
  //maxPriorityFeePerGas는 채굴자에게 줄 수 있는 팁의 최대값
  //Total = ( maxFeePerGas + maxPriorityFeePerGas) * GasLimit
  getTotalGasFee_EIP1559 = ({ gasLevel, maxFeePerGas, gasLimit, maxPriorityFeePerGas }: IGetTotalGasFeeArgumentsEIP1559) => {
    const gasWeight = gasLevel ? GAS_LEVEL_SETTING[gasLevel].eip1559Weight : ' 1';
    const levelMultipliedGasPrice = BigNumber.from(new Decimal(maxFeePerGas.toString()).mul(gasWeight).toString());
    const totalGas = levelMultipliedGasPrice.mul(gasLimit).add(maxPriorityFeePerGas);
    return formatEther(totalGas);
  };

  getEstimateTime = (gasLevel: TGasLevel) => {
    return GAS_LEVEL_SETTING[gasLevel].waitTime;
  };
}
