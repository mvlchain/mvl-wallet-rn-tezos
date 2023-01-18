import { TransactionRequest } from '@ethersproject/abstract-provider';
import { BigNumber } from 'ethers';

import { INetworkInfo } from '@@domain/transaction/TransactionService.type';

export interface IGasRepositoryEVMLegacy {
  getGasPrice: (networkInfo: INetworkInfo) => Promise<BigNumber>;
  estimateGas: (networkInfo: INetworkInfo, args: TransactionRequest) => Promise<BigNumber>;
}
