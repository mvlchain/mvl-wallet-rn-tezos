import { TransactionRequest } from '@ethersproject/abstract-provider';
import { ethers } from 'ethers';
import { inject, injectable } from 'tsyringe';

import { getNetworkConfig, Network } from '@@constants/network.constant';
import { EvmJsonRpcProviderHolder } from '@@domain/blockchain/EvmJsonRpcProviderHolder';
import { loadingFunction } from '@@utils/loadingHelper';

import { ITransactionServiceEthers } from './TransactionServiceEthers.type';

@injectable()
export class TransactionServiceEthers implements ITransactionServiceEthers {
  constructor(@inject('EvmJsonRpcProviderHolder') private evmJsonRpcProviderHolder: EvmJsonRpcProviderHolder) {}

  sendTransaction = loadingFunction<string | undefined>(
    async (selectedNetwork: Network, selectedWalletPrivateKey: string, params: TransactionRequest) => {
      try {
        const network = getNetworkConfig(selectedNetwork);
        const provider = this.evmJsonRpcProviderHolder.getProvider(network.rpcUrl);
        const wallet = new ethers.Wallet(selectedWalletPrivateKey, provider);

        const res = await wallet.sendTransaction({
          chainId: network.chainId,
          ...params,
        });
        return res.hash;
      } catch (err) {
        console.log(err);
      }
    }
  );

  getTransaction = loadingFunction<number | undefined>(async (selectedNetwork: Network, hash: string) => {
    try {
      const network = getNetworkConfig(selectedNetwork);
      const provider = this.evmJsonRpcProviderHolder.getProvider(network.rpcUrl);

      const transactionInfo = await provider.getTransaction(hash);

      return transactionInfo.nonce;
    } catch (err) {
      console.log(err);
    }
  });
}
