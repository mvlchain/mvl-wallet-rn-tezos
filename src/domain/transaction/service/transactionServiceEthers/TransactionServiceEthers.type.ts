import { TransactionRequest } from '@ethersproject/abstract-provider';

import { Network } from '@@constants/network.constant';

export interface ITransactionServiceEthers {
  sendTransaction(selectedNetwork: Network, selectedWalletPrivateKey: string, params: TransactionRequest): Promise<string>;
  approveTransaction(selectedNetwork: Network, selectedWalletPrivateKey: string, params: TransactionRequest): Promise<string>;
}
