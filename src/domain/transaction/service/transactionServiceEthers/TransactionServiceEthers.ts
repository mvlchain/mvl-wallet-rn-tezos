import '@ethersproject/shims';
import { TransactionRequest } from '@ethersproject/abstract-provider';
import { ethers } from 'ethers';
import { injectable } from 'tsyringe';

import { getNetworkConfig, Network } from '@@constants/network.constant';

import { ITransactionServiceEthers } from './TransactionServiceEthers.type';

@injectable()
export class TransactionServiceEthers implements ITransactionServiceEthers {
  constructor() {}

  async sendTransaction(selectedNetwork: Network, selectedWalletPrivateKey: string, params: TransactionRequest): Promise<string> {
    const network = getNetworkConfig(selectedNetwork);
    const provider = new ethers.providers.JsonRpcProvider(network.rpcUrl);
    const wallet = new ethers.Wallet(selectedWalletPrivateKey, provider);

    const res = await wallet.sendTransaction({
      chainId: network.chainId,
      ...params,
    });

    return res.hash;
  }
}
