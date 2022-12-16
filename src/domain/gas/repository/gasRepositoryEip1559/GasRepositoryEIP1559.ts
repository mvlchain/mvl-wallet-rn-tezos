import { inject, injectable } from 'tsyringe';

import { EvmJsonRpcProviderHolder } from '@@domain/blockchain/EvmJsonRpcProviderHolder';
import { INetworkInfo } from '@@domain/transaction/TransactionService.type';
import { formatBigNumber } from '@@utils/formatBigNumber';
import { etherBNtoBN } from '@@utils/gas';
import { loadingFunction } from '@@utils/loadingHelper';

import { IGasFeeInfoEip1559, IGasRepositoryEip1559, IGetTotalGasFeeParamsEIP1559 } from './GasRepositoryEip1559.type';
@injectable()
export class GasRepositoryEip1559Impl implements IGasRepositoryEip1559 {
  constructor(@inject('EvmJsonRpcProviderHolder') private evmJsonRpcProviderHolder: EvmJsonRpcProviderHolder) {}

  getGasFeeData = loadingFunction<IGasFeeInfoEip1559>(async (networkInfo: INetworkInfo) => {
    const provider = this.evmJsonRpcProviderHolder.getProvider(networkInfo.rpcUrl);
    const block = await provider.getBlock('latest');
    const gasPrice = await provider.getFeeData();
    return {
      gasLimit: etherBNtoBN(block.gasLimit),
      maxFeePerGas: etherBNtoBN(gasPrice.maxFeePerGas),
      maxPriorityFeePerGas: etherBNtoBN(gasPrice.maxPriorityFeePerGas),
      lastBaseFeePerGas: etherBNtoBN(gasPrice.lastBaseFeePerGas),
      gasPrice: etherBNtoBN(gasPrice.gasPrice),
    };
  });

  getTotalGasFee = ({ baseFee, gas, tip }: IGetTotalGasFeeParamsEIP1559) => {
    const totalGas = baseFee.plus(tip).multipliedBy(gas);
    return formatBigNumber(totalGas, 18).toString();
  };
}
