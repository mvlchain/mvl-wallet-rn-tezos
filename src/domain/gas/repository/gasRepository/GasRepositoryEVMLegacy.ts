import { TransactionRequest } from '@ethersproject/abstract-provider';
import { BigNumber } from 'ethers';
import { inject, injectable } from 'tsyringe';

import { EvmJsonRpcProviderHolder } from '@@domain/blockchain/EvmJsonRpcProviderHolder';
import { INetworkInfo } from '@@domain/transaction/TransactionService.type';
import { WalletService } from '@@domain/wallet/services/WalletService';
import { loadingFunction } from '@@utils/loadingHelper';

import { IGasRepositoryEVMLegacy } from './GasRepositoryEVMLegacy.type';

@injectable()
export class GasRepositoryEVMLegacy implements IGasRepositoryEVMLegacy {
  constructor(
    @inject('WalletService') private walletService: WalletService,
    @inject('EvmJsonRpcProviderHolder') private evmJsonRpcProviderHolder: EvmJsonRpcProviderHolder
  ) {}

  getGasPrice = loadingFunction<BigNumber>(async (networkInfo: INetworkInfo) => {
    // TODO: get gasPrice from v1/fee/:networkName | v2/fee/:networkName
    const provider = this.evmJsonRpcProviderHolder.getProvider(networkInfo.rpcUrl);
    return await provider.getGasPrice();
  });

  estimateGas = loadingFunction<BigNumber>(async (networkInfo: INetworkInfo, args: TransactionRequest) => {
    const provider = this.evmJsonRpcProviderHolder.getProvider(networkInfo.rpcUrl);
    return await provider.estimateGas(args);
  });
}
