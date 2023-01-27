import { TransactionRequest, TransactionResponse } from '@ethersproject/abstract-provider';
import { ethers } from 'ethers';
import { inject, injectable } from 'tsyringe';

import { abiERC20 } from '@@constants/contract/abi/abiERC20';
import { getNetworkConfig, Network } from '@@constants/network.constant';
import { EvmJsonRpcProviderHolder } from '@@domain/blockchain/EvmJsonRpcProviderHolder';
import { WalletService } from '@@domain/wallet/services/WalletService';
import { loadingFunction } from '@@utils/loadingHelper';

import { ITransactionServiceEthers } from './TransactionServiceEthers.type';

@injectable()
export class TransactionServiceEthers implements ITransactionServiceEthers {
  constructor(
    @inject('EvmJsonRpcProviderHolder') private evmJsonRpcProviderHolder: EvmJsonRpcProviderHolder,
    @inject('WalletService') private walletService: WalletService
  ) {}

  sendTransaction = loadingFunction<TransactionResponse | undefined>(
    async (selectedNetwork: Network, selectedWalletIndex: number, params: TransactionRequest) => {
      const network = getNetworkConfig(selectedNetwork);
      const provider = this.evmJsonRpcProviderHolder.getProvider(network.rpcUrl);
      const walletInfo = await this.walletService.getWalletInfo({ index: selectedWalletIndex, network: selectedNetwork });
      const wallet = new ethers.Wallet(walletInfo.privateKey, provider);

      return await wallet.sendTransaction({
        chainId: network.chainId,
        ...params,
      });
    }
  );

  getTransaction = loadingFunction<TransactionResponse | undefined>(async (selectedNetwork: Network, hash: string) => {
    const network = getNetworkConfig(selectedNetwork);
    const provider = this.evmJsonRpcProviderHolder.getProvider(network.rpcUrl);

    return await provider.getTransaction(hash);
  });

  encodeFunctionData = async (method: string, params: any) => {
    return new ethers.utils.Interface(abiERC20).encodeFunctionData(method, params);
  };

  decodeFunctionData = (method: string, params: any) => {
    const contractInterface = ethers.ContractFactory.getInterface(abiERC20);
    const func = contractInterface.getFunction(params.slice(0, 10));
    const parsed = contractInterface.decodeFunctionData(func, params);
    return parsed;
  };
}
