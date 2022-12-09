import { TransactionRequest } from '@ethersproject/abstract-provider';
import { ethers } from 'ethers';
import { injectable } from 'tsyringe';

import { getNetworkConfig, Network } from '@@constants/network.constant';
import { loadingFunction } from '@@utils/loadingHelper';

import { ITransactionServiceEthers } from './TransactionServiceEthers.type';

@injectable()
export class TransactionServiceEthers implements ITransactionServiceEthers {
  constructor() {}

  sendTransaction = loadingFunction<string | undefined>(
    async (selectedNetwork: Network, selectedWalletPrivateKey: string, params: TransactionRequest) => {
      try {
        const network = getNetworkConfig(selectedNetwork);
        const provider = new ethers.providers.JsonRpcProvider(network.rpcUrl);
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
}
