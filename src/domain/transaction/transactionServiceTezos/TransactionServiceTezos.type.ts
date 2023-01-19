import { TransferParams, WalletOperation } from '@taquito/taquito';

import { Network } from '@@constants/network.constant';

export interface ITransactionServiceTezos {
  sendTransaction: (selectedNetwork: Network, selectedWalletIndex: number, params: TransferParams) => Promise<WalletOperation>;
  getTransferParam: ({ selectedNetwork, selectedWalletIndex, to, amount, contractAddress }: IGetTransferParam) => Promise<TransferParams>;
}

export interface IGetTransferParam {
  selectedNetwork: Network;
  selectedWalletIndex: number;
  to: string;
  amount: number;
  contractAddress: string;
}
