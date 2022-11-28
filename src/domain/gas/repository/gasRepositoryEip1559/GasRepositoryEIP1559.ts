import { injectable } from 'tsyringe';
import '@ethersproject/shims';
import { BigNumber, ethers } from 'ethers';

import { GAS_LEVEL_SETTING } from '@@constants/transaction.constant';
import { TGasLevel } from '@@domain/gas/GasService.type';
import { INetworkInfo } from '@@domain/transaction/TransactionService.type';

import { IGetTotalGasFeeArgumentsEIP1559, IGasRepositoryEip1559 } from './GasRepositoryEip1559.type';

import Decimal from 'decimal.js';
import { formatEther } from 'ethers/lib/utils';

@injectable()
export class GasRepositoryEip1559Impl implements IGasRepositoryEip1559 {
  getGasFeeData = async (networkInfo: INetworkInfo) => {
    const provider = new ethers.providers.JsonRpcProvider(networkInfo.rpcUrl);
    const block = await provider.getBlock('latest');
    const gasLimit = block.gasLimit;
    const gasPrice = await provider.getFeeData();
    return { gasLimit, ...gasPrice };
  };
  //maxFeePerGas 자신이 최대로 허용할 수 있는 가스의 최대 가격, 사용한만큼 쓰고 돌려준다.
  //maxPriorityFeePerGas는 채굴자에게 줄 수 있는 팁의 최대값
  //Total = ( maxFeePerGas + maxPriorityFeePerGas) * usedGas
  getTotalGasFee = ({ gasLevel, maxFeePerGas, estimatedGas, maxPriorityFeePerGas }: IGetTotalGasFeeArgumentsEIP1559) => {
    const gasWeight = gasLevel ? GAS_LEVEL_SETTING[gasLevel].eip1559Weight : '1';
    const maxFeePerGasInDecimal = new Decimal(maxFeePerGas.toString());
    const maxPriorityFeePerGasInDecimal = new Decimal(maxPriorityFeePerGas.toString());
    const gasLimitInDecimal = new Decimal(estimatedGas.toString());

    const totalGas = maxFeePerGasInDecimal.mul(gasWeight).add(maxPriorityFeePerGasInDecimal).mul(gasLimitInDecimal);
    const totalGasInBN = BigNumber.from(BigInt(Math.floor(totalGas.toNumber())));
    return formatEther(totalGasInBN);
  };
}
