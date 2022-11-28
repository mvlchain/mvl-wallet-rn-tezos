import { injectable } from 'tsyringe';
import '@ethersproject/shims';
import { BigNumber, ethers } from 'ethers';

import { GAS_LEVEL_SETTING } from '@@constants/transaction.constant';

import { IGetTotalGasFeeArgsTEZ, IGasRepositoryTezos, IEstimateGasArgsTEZ } from './GasRepositoryTezos.type';

import Decimal from 'decimal.js';
import { formatEther } from 'ethers/lib/utils';
import { TezosToolkit } from '@taquito/taquito';
import { InMemorySigner } from '@taquito/signer';

@injectable()
export class GasRepositoryTezosImpl implements IGasRepositoryTezos {
  //Total = baseFee + feeOption
  getTotalGasFee = ({ baseFee, additionalFee, gasLevel }: IGetTotalGasFeeArgsTEZ) => {
    const addFee = gasLevel ? GAS_LEVEL_SETTING[gasLevel].tezosAdditionalFee : additionalFee ? additionalFee : 0.0001;
    const addFeeInDecimal = new Decimal(addFee.toString());
    const baseFeeInDecimal = new Decimal(baseFee.toString());

    const totalGas = baseFeeInDecimal.add(addFeeInDecimal);
    const totalGasInBN = BigNumber.from(BigInt(Math.floor(totalGas.toNumber())));

    return formatEther(totalGasInBN);
  };

  estimateGas = async ({ rpcUrl, to, amount, privateKey }: IEstimateGasArgsTEZ) => {
    //TODO: 임시 주소 TEZO에 맞는 지갑 주소 필요함, 양식이 다름
    const Tezos = new TezosToolkit(rpcUrl);
    Tezos.setProvider({
      signer: new InMemorySigner('edsk2rKA8YEExg9Zo2qNPiQnnYheF1DhqjLVmfKdxiFfu5GyGRZRnb'),
    });
    return await Tezos.estimate.transfer({ to, amount });
  };
}
