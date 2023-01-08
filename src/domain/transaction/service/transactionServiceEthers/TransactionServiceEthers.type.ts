import { TransactionRequest } from '@ethersproject/abstract-provider';
import { BytesLike } from 'ethers';

import { Network } from '@@constants/network.constant';

export interface ITransactionServiceEthers {
  sendTransaction: (selectedNetwork: Network, selectedWalletPrivateKey: string, params: TransactionRequest) => Promise<string | undefined>;
  getTransaction: (selectedNetwork: Network, hash: string) => Promise<number | undefined>;
  encodeData: (method: string, params: any) => Promise<BytesLike>;
}
