import { FeeData, TransactionRequest } from '@ethersproject/abstract-provider';
import { Network } from 'bitcoinjs-lib';
import { BigNumber } from 'ethers';

export interface IGasRepositoryEVMLegacy {
  getGasPrice: (selectedNetwork: Network) => Promise<BigNumber>;
  getFeeData: (selectedNetwork: Network) => Promise<FeeData>;
  estimateGas: (selectedNetwork: Network, args: TransactionRequest) => Promise<BigNumber>;
}
