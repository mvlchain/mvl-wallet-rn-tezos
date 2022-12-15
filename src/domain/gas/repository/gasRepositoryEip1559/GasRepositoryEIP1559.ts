import Decimal from 'decimal.js';
import { BigNumber } from 'ethers';
import { formatEther } from 'ethers/lib/utils';
import { inject, injectable } from 'tsyringe';

import { EvmJsonRpcProviderHolder } from '@@domain/blockchain/EvmJsonRpcProviderHolder';
import { INetworkInfo } from '@@domain/transaction/TransactionService.type';
import { loadingFunction } from '@@utils/loadingHelper';

import { IGasFeeInfoEip1559, IGasRepositoryEip1559, IGetTotalGasFeeParamsEIP1559 } from './GasRepositoryEip1559.type';

@injectable()
export class GasRepositoryEip1559Impl implements IGasRepositoryEip1559 {
  constructor(@inject('EvmJsonRpcProviderHolder') private evmJsonRpcProviderHolder: EvmJsonRpcProviderHolder) {}

  getGasFeeData = loadingFunction<IGasFeeInfoEip1559>(async (networkInfo: INetworkInfo) => {
    const provider = this.evmJsonRpcProviderHolder.getProvider(networkInfo.rpcUrl);
    const block = await provider.getBlock('latest');
    const gasLimit = block.gasLimit;
    const gasPrice = await provider.getFeeData();
    return { gasLimit, ...gasPrice };
  });

  getTotalGasFee = ({ baseFee, gas, tip }: IGetTotalGasFeeParamsEIP1559) => {
    const baseFeeInDecimal = new Decimal(baseFee.toString());
    const tipInDecimal = new Decimal(tip.toString());
    const estimatedGasInDecimal = new Decimal(gas.toString());

    const totalGas = baseFeeInDecimal.add(tipInDecimal).mul(estimatedGasInDecimal);
    const totalGasInBN = BigNumber.from(Math.floor(totalGas.toNumber()));
    return formatEther(totalGasInBN);
  };
}
