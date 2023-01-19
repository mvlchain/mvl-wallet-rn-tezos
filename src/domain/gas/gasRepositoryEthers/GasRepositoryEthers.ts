import { FeeData, TransactionRequest } from '@ethersproject/abstract-provider';
import { BigNumber } from 'ethers';
import { inject, injectable } from 'tsyringe';

import { getNetworkConfig, Network } from '@@constants/network.constant';
import { EvmJsonRpcProviderHolder } from '@@domain/blockchain/EvmJsonRpcProviderHolder';
import { loadingFunction } from '@@utils/loadingHelper';

import { IGasRepositoryEVMLegacy } from './GasRepositoryEVMLegacy.type';

@injectable()
export class GasRepositoryEVMLegacy implements IGasRepositoryEVMLegacy {
  constructor(@inject('EvmJsonRpcProviderHolder') private evmJsonRpcProviderHolder: EvmJsonRpcProviderHolder) {}

  getGasPrice = loadingFunction<BigNumber>(async (selectedNetwork: Network) => {
    // TODO: get gasPrice from v1/fee/:networkName | v2/fee/:networkName
    const network = getNetworkConfig(selectedNetwork);
    const provider = this.evmJsonRpcProviderHolder.getProvider(network.rpcUrl);
    return await provider.getGasPrice();
  });

  getFeeData = loadingFunction<FeeData>(async (selectedNetwork: Network) => {
    const network = getNetworkConfig(selectedNetwork);
    const provider = this.evmJsonRpcProviderHolder.getProvider(network.rpcUrl);
    return await provider.getFeeData();
  });

  estimateGas = loadingFunction<BigNumber>(async (selectedNetwork: Network, args: TransactionRequest) => {
    const network = getNetworkConfig(selectedNetwork);
    const provider = this.evmJsonRpcProviderHolder.getProvider(network.rpcUrl);
    return await provider.estimateGas(args);
  });
}
