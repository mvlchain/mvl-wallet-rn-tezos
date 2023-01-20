import { FeeData, TransactionRequest } from '@ethersproject/abstract-provider';
import { Network } from 'bitcoinjs-lib';
import { BigNumber } from 'ethers';

export interface IGasRepositoryEthers {
  getGasPrice: (selectedNetwork: Network) => Promise<BigNumber>;
  getFeeData: (selectedNetwork: Network) => Promise<FeeData>;
  estimateGas: (selectedNetwork: Network, selectedWalletIndex: number, args: TransactionRequest) => Promise<BigNumber>;
}
