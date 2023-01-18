import { FeeData, TransactionRequest } from '@ethersproject/abstract-provider';
import { BigNumber } from 'ethers';

import { INetworkInfo } from '@@domain/transaction/TransactionService.type';

export interface IGasRepositoryEVMLegacy {
  getGasPrice: (networkInfo: INetworkInfo) => Promise<BigNumber>;
  getFeeData: (networkInfo: INetworkInfo) => Promise<FeeData>;
  estimateGas: (networkInfo: INetworkInfo, args: TransactionRequest) => Promise<BigNumber>;
}
