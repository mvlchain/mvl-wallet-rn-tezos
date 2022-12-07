import { InMemorySigner } from '@taquito/signer';
import { TezosToolkit } from '@taquito/taquito';
import Decimal from 'decimal.js';
import { BigNumber, ethers } from 'ethers';
import { formatEther } from 'ethers/lib/utils';
import { injectable } from 'tsyringe';

import { IGetTotalGasFeeParamsTEZ, IGasRepositoryTezos, IEstimateGasParamsTEZ } from './GasRepositoryTezos.type';

@injectable()
export class GasRepositoryTezosImpl implements IGasRepositoryTezos {
  getTotalGasFee = ({ tip, estimatedGas }: IGetTotalGasFeeParamsTEZ) => {
    const tipInDecimal = new Decimal(tip);
    const estimatedGasInDecimal = new Decimal(estimatedGas.toString());

    const totalGas = estimatedGasInDecimal.add(tipInDecimal);
    const totalGasInBN = BigNumber.from(BigInt(Math.floor(totalGas.toNumber())));

    return formatEther(totalGasInBN);
  };

  estimateGas = async ({ rpcUrl, to, amount }: IEstimateGasParamsTEZ) => {
    //TODO: 임시 주소 TEZO에 맞는 지갑 주소 필요함, 양식이 다름
    const Tezos = new TezosToolkit(rpcUrl);
    Tezos.setProvider({
      signer: new InMemorySigner('edsk2rKA8YEExg9Zo2qNPiQnnYheF1DhqjLVmfKdxiFfu5GyGRZRnb'),
    });
    return await Tezos.estimate.transfer({ to, amount });
  };
}
