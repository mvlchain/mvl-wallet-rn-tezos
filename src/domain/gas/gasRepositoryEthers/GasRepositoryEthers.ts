import { FeeData, TransactionRequest } from '@ethersproject/abstract-provider';
import { BigNumber } from 'ethers';
import { inject, injectable } from 'tsyringe';

import { getNetworkConfig, Network } from '@@constants/network.constant';
import { EvmJsonRpcProviderHolder } from '@@domain/blockchain/EvmJsonRpcProviderHolder';
import { WalletService } from '@@domain/wallet/services/WalletService';
import { loadingFunction } from '@@utils/loadingHelper';

import { IGasRepositoryEthers } from './GasRepositoryEthers.type';

@injectable()
export class GasRepositoryEthers implements IGasRepositoryEthers {
  constructor(
    @inject('EvmJsonRpcProviderHolder') private evmJsonRpcProviderHolder: EvmJsonRpcProviderHolder,
    @inject('WalletService') private walletService: WalletService
  ) {}

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

  estimateGas = loadingFunction<BigNumber>(async (selectedNetwork: Network, selectedWalletIndex: number, args: TransactionRequest) => {
    const network = getNetworkConfig(selectedNetwork);
    const provider = this.evmJsonRpcProviderHolder.getProvider(network.rpcUrl);
    const walletInfo = await this.walletService.getWalletInfo({ network: selectedNetwork, index: selectedWalletIndex });
    return await provider.estimateGas({ ...args, from: walletInfo.address });
  });
}
