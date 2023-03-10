import { TransactionRequest, TransactionResponse } from '@ethersproject/abstract-provider';
import { BytesLike, ethers } from 'ethers';

import { Network } from '@@constants/network.constant';

export interface ITransactionServiceEthers {
  sendTransaction: (selectedNetwork: Network, selectedWalletIndex: number, params: TransactionRequest) => Promise<TransactionResponse | undefined>;
  getTransaction: (selectedNetwork: Network, hash: string) => Promise<TransactionResponse | undefined>;
  encodeFunctionData: (method: string, params: any) => Promise<BytesLike>;
  decodeFunctionData: (method: string, params: any) => ethers.utils.Result;
}
