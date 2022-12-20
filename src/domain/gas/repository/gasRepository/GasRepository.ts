import { TransactionRequest } from '@ethersproject/abstract-provider';
import BigNumber from 'bignumber.js';
import { inject, injectable } from 'tsyringe';

import { EvmJsonRpcProviderHolder } from '@@domain/blockchain/EvmJsonRpcProviderHolder';
import { INetworkInfo } from '@@domain/transaction/TransactionService.type';
import { WalletService } from '@@domain/wallet/services/WalletService';
import { etherBNtoBN } from '@@utils/formatBigNumber';
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
    return { gasLimit: etherBNtoBN(gasLimit), gasPrice: etherBNtoBN(gasPrice) };
  });

  getTotalGasFee = ({ baseFee, gas }: IGetTotalGasFeeParamsEthers) => {
    const totalGas = baseFee.multipliedBy(gas);
    return new BigNumber(totalGas);
  };

  estimateGas = loadingFunction<BigNumber>(async (networkInfo: INetworkInfo, args: TransactionRequest) => {
    const provider = this.evmJsonRpcProviderHolder.getProvider(networkInfo.rpcUrl);
    const gas = await provider.estimateGas(args);
    return etherBNtoBN(gas);
  });
}
