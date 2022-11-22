import { IGasFeeInfo, INetworkInfo } from './TransactionService.type';

export interface IGasService {
  getGasInfo: (networkInfo: INetworkInfo) => Promise<IGasFeeInfo>;
}
