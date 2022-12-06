import { inject, injectable } from 'tsyringe';
import '@ethersproject/shims';
import { BigNumber, ethers } from 'ethers';

import { getNetworkConfig } from '@@constants/network.constant';
import { INetworkInfo } from '@@domain/transaction/TransactionService.type';
import { WalletService } from '@@domain/wallet/services/WalletService';

import { IEstimateGasParams, IGasRepository, IGetTotalGasFeeParamsEthers } from './GasRepository.type';

import Decimal from 'decimal.js';
import { formatEther } from 'ethers/lib/utils';
import { TransactionRequest } from '@ethersproject/abstract-provider';

@injectable()
export class GasRepositoryImpl implements IGasRepository {
  constructor(@inject('WalletService') private walletService: WalletService) {}

  getGasFeeData = async (networkInfo: INetworkInfo) => {
    const provider = new ethers.providers.JsonRpcProvider(networkInfo.rpcUrl);
    const block = await provider.getBlock('latest');
    const gasLimit = block.gasLimit;
    const gasPrice = await provider.getGasPrice();
    return { gasLimit, gasPrice };
  };

  getTotalGasFee = ({ baseFee, gasLimit }: IGetTotalGasFeeParamsEthers) => {
    const baseFeeInDecimal = new Decimal(baseFee.toString());
    const gasLimitInDecimal = new Decimal(gasLimit.toString());

    const totalGas = baseFeeInDecimal.mul(gasLimitInDecimal);
    const totalGasInBN = BigNumber.from(BigInt(Math.floor(totalGas.toNumber())));

    return formatEther(totalGasInBN);
  };

  estimateGas = async (networkInfo: INetworkInfo, args: TransactionRequest) => {
    const provider = new ethers.providers.JsonRpcProvider(networkInfo.rpcUrl);
    return await provider.estimateGas(args);
  };
}
