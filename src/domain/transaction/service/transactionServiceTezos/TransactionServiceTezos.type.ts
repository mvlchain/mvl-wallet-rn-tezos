import { TransferParams } from '@taquito/taquito';

import { Network } from '@@constants/network.constant';

export interface ITransactionServiceTezos {
  sendTransaction(selectedNetwork: Network, selectedWalletPrivateKey: string, params: TransferParams): Promise<string>;
}
