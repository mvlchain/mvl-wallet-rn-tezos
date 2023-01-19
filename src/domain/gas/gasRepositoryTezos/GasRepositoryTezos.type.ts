import { Network } from '@ethersproject/networks';
import { Estimate, TransferParams } from '@taquito/taquito';

export interface IGasRepositoryTezos {
  estimateGas: (selectedNetwork: Network, selectedWalletIndex: number, param: TransferParams) => Promise<Estimate | undefined>;
}
