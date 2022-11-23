import { GAS_LEVEL } from '@@constants/transaction.constant';

import { IGasFeeInfo, INetworkInfo } from './TransactionService.type';

export interface IGasService {
  getGasFeeData: (networkInfo: INetworkInfo) => Promise<IGasFeeInfo>;
}

export type TGasLevel = typeof GAS_LEVEL[keyof typeof GAS_LEVEL];
