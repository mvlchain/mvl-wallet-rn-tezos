import { TransactionRequest } from '@ethersproject/abstract-provider';
import { ethers } from 'ethers';
import { inject, injectable } from 'tsyringe';

import { abiERC20 } from '@@constants/contract/abi/abiERC20';
import { getNetworkConfig, Network } from '@@constants/network.constant';
import { EvmJsonRpcProviderHolder } from '@@domain/blockchain/EvmJsonRpcProviderHolder';
import { loadingFunction } from '@@utils/loadingHelper';

import { ITransactionServiceEthers } from './TransactionServiceEthers.type';

@injectable()
export class TransactionServiceEthers implements ITransactionServiceEthers {
  constructor(@inject('EvmJsonRpcProviderHolder') private evmJsonRpcProviderHolder: EvmJsonRpcProviderHolder) {}

  sendTransaction = loadingFunction<string | undefined>(
    async (selectedNetwork: Network, selectedWalletPrivateKey: string, params: TransactionRequest) => {
      const network = getNetworkConfig(selectedNetwork);
      const provider = this.evmJsonRpcProviderHolder.getProvider(network.rpcUrl);
      const wallet = new ethers.Wallet(selectedWalletPrivateKey, provider);

      const res = await wallet.sendTransaction({
        chainId: network.chainId,
        ...params,
      });
      return res.hash;
    }
  );

  getTransaction = loadingFunction<number | undefined>(async (selectedNetwork: Network, hash: string) => {
    const network = getNetworkConfig(selectedNetwork);
    const provider = this.evmJsonRpcProviderHolder.getProvider(network.rpcUrl);

    const transactionInfo = await provider.getTransaction(hash);

    return transactionInfo.nonce;
  });

  encodeData = async (method: string, params: any) => {
    return new ethers.utils.Interface(abiERC20).encodeFunctionData(method, params);
  };
}
