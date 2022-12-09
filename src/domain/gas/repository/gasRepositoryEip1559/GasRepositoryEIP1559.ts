import Decimal from 'decimal.js';
import { BigNumber, ethers } from 'ethers';
import { formatEther } from 'ethers/lib/utils';
import { injectable } from 'tsyringe';

import { GAS_LEVEL_SETTING } from '@@constants/transaction.constant';
import { INetworkInfo } from '@@domain/transaction/TransactionService.type';
import { loadingFunction } from '@@utils/loadingHelper';

import { IGetTotalGasFeeParamsEIP1559, IGasRepositoryEip1559, IGasFeeInfoEip1559 } from './GasRepositoryEip1559.type';

@injectable()
export class GasRepositoryEip1559Impl implements IGasRepositoryEip1559 {
  getGasFeeData = loadingFunction<IGasFeeInfoEip1559>(async (networkInfo: INetworkInfo) => {
    const provider = new ethers.providers.JsonRpcProvider(networkInfo.rpcUrl);
    const block = await provider.getBlock('latest');
    const gasLimit = block.gasLimit;
    const gasPrice = await provider.getFeeData();
    return { gasLimit, ...gasPrice };
  });

  getTotalGasFee = ({ baseFee, estimatedGas, tip }: IGetTotalGasFeeParamsEIP1559) => {
    const baseFeeInDecimal = new Decimal(baseFee.toString());
    const tipInDecimal = new Decimal(tip.toString());
    const estimatedGasInDecimal = new Decimal(estimatedGas.toString());

    const totalGas = baseFeeInDecimal.add(tipInDecimal).mul(estimatedGasInDecimal);
    const totalGasInBN = BigNumber.from(Math.floor(totalGas.toNumber()));
    return formatEther(totalGasInBN);
  };
}
