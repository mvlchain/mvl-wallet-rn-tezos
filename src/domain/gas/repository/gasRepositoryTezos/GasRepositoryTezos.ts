import { injectable } from 'tsyringe';
import '@ethersproject/shims';
import { BigNumber, ethers } from 'ethers';

import { GAS_LEVEL_SETTING } from '@@constants/transaction.constant';
import { TGasLevel } from '@@domain/gas/GasService.type';
import { INetworkInfo } from '@@domain/transaction/TransactionService.type';

import { IGetTotalGasFeeArgumentsTezos, IGasRepositoryTezos } from './GasRepositoryTezos.type';

import Decimal from 'decimal.js';
import { formatEther } from 'ethers/lib/utils';

@injectable()
export class GasRepositoryTezosImpl implements IGasRepositoryTezos {
  //Total = baseFee + feeOption
  getTotalGasFee = ({ baseFee, additionalFee, gasLevel }: IGetTotalGasFeeArgumentsTezos) => {
    const addFee = gasLevel ? GAS_LEVEL_SETTING[gasLevel].tezosAdditionalFee : additionalFee ? additionalFee : 0.0001;
    const addFeeInDecimal = new Decimal(addFee.toString());
    const baseFeeInDecimal = new Decimal(baseFee.toString());

    const totalGas = baseFeeInDecimal.add(addFeeInDecimal);
    const totalGasInBN = BigNumber.from(BigInt(Math.floor(totalGas.toNumber())));

    return formatEther(totalGasInBN);
  };
}
