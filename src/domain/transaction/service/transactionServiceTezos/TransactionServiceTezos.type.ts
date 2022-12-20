import { TransferParams } from '@taquito/taquito';

import { Network } from '@@constants/network.constant';

export interface ITezosContractTransferParam extends TransferParams {
  data: string;
}

export interface ITezosData {
  from: string;
  to: string;
  value: string;
}
export interface ITransactionServiceTezos {
  sendTransaction: (selectedNetwork: Network, selectedWalletPrivateKey: string, params: TransferParams) => Promise<string>;
  sendContractTransaction: (selectedNetwork: Network, selectedWalletPrivateKey: string, params: ITezosContractTransferParam) => Promise<string>;
}
