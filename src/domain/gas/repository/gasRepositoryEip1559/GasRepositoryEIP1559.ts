import { injectable } from 'tsyringe';
import '@ethersproject/shims';
import { BigNumber, ethers } from 'ethers';

import { GAS_LEVEL_SETTING } from '@@constants/transaction.constant';
import { INetworkInfo } from '@@domain/transaction/TransactionService.type';

import { IGetTotalGasFeeParamsEIP1559, IGasRepositoryEip1559 } from './GasRepositoryEip1559.type';

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

  getTotalGasFee = ({ gasLevel, baseFee, estimatedGas, tip }: IGetTotalGasFeeParamsEIP1559) => {
    const gasWeight = gasLevel ? GAS_LEVEL_SETTING[gasLevel].eip1559Weight : '1.1';
    const baseFeeInDecimal = new Decimal(baseFee.toString());
    const tipInDecimal = new Decimal(tip.toString());
    const estimatedGasInDecimal = new Decimal(estimatedGas.toString());

    const totalGas = baseFeeInDecimal.mul(gasWeight).add(tipInDecimal).mul(estimatedGasInDecimal);
    const totalGasInBN = BigNumber.from(BigInt(Math.floor(totalGas.toNumber())));
    return formatEther(totalGasInBN);
  };
}
