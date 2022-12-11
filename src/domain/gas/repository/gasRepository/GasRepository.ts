import { TransactionRequest } from '@ethersproject/abstract-provider';
import Decimal from 'decimal.js';
import { BigNumber } from 'ethers';
import { formatEther } from 'ethers/lib/utils';
import { inject, injectable } from 'tsyringe';

import { EvmJsonRpcProviderHolder } from '@@domain/blockchain/EvmJsonRpcProviderHolder';
import { INetworkInfo } from '@@domain/transaction/TransactionService.type';
import { WalletService } from '@@domain/wallet/services/WalletService';
import { loadingFunction } from '@@utils/loadingHelper';

import { IGasFeeInfoEthers, IGasRepository, IGetTotalGasFeeParamsEthers } from './GasRepository.type';

@injectable()
export class GasRepositoryImpl implements IGasRepository {
  constructor(
    @inject('WalletService') private walletService: WalletService,
    @inject('EvmJsonRpcProviderHolder') private evmJsonRpcProviderHolder: EvmJsonRpcProviderHolder
  ) {}

  getGasFeeData = loadingFunction<IGasFeeInfoEthers>(async (networkInfo: INetworkInfo) => {
    // TODO: get gasPrice from v1/fee/:networkName | v2/fee/:networkName
    const provider = this.evmJsonRpcProviderHolder.getProvider(networkInfo.rpcUrl);
    const block = await provider.getBlock('latest');
    const gasLimit = block.gasLimit;
    const gasPrice = await provider.getGasPrice();
    return { gasLimit, gasPrice };
  });

  getTotalGasFee = ({ baseFee, gasLimit }: IGetTotalGasFeeParamsEthers) => {
    const baseFeeInDecimal = new Decimal(baseFee.toString());
    const gasLimitInDecimal = new Decimal(gasLimit.toString());

    const totalGas = baseFeeInDecimal.mul(gasLimitInDecimal);
    const totalGasInBN = BigNumber.from(Math.floor(totalGas.toNumber()));

    return formatEther(totalGasInBN);
  };

  estimateGas = loadingFunction<BigNumber>(async (networkInfo: INetworkInfo, args: TransactionRequest) => {
    const provider = this.evmJsonRpcProviderHolder.getProvider(networkInfo.rpcUrl);
    return await provider.estimateGas(args);
  });
}
