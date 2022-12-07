import { TransactionRequest, TransactionResponse } from '@ethersproject/abstract-provider';

import { Network } from '@@constants/network.constant';

export interface ITransactionServiceEthers {
  sendTransaction: (selectedNetwork: Network, selectedWalletPrivateKey: string, params: TransactionRequest) => Promise<string | undefined>;
}
