import { injectable } from 'tsyringe';
import '@ethersproject/shims';
import { ethers } from 'ethers';

import { IGasService } from './GasService.type';
import { INetworkInfo } from './TransactionService.type';

@injectable()
export class GasServiceImpl implements IGasService {
  getGasFeeData = async (networkInfo: INetworkInfo) => {
    const provider = new ethers.providers.JsonRpcProvider(networkInfo.rpcUrl);
    const block = await provider.getBlock('latest');
    const gasLimit = block.gasLimit;
    const gasPrice = await provider.getGasPrice();
    return { gasLimit, gasPrice };
  };
}
