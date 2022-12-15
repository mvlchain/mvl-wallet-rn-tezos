import { InMemorySigner } from '@taquito/signer';
import { Estimate, TezosToolkit } from '@taquito/taquito';
import Decimal from 'decimal.js';
import { BigNumber } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';
import { injectable } from 'tsyringe';

import { loadingFunction } from '@@utils/loadingHelper';

import { IGetTotalGasFeeParamsTEZ, IGasRepositoryTezos, IEstimateGasParamsTEZ } from './GasRepositoryTezos.type';

@injectable()
export class GasRepositoryTezosImpl implements IGasRepositoryTezos {
  getTotalGasFee = ({ tip, baseFee }: IGetTotalGasFeeParamsTEZ) => {
    const baseFeeInDecimal = new Decimal(baseFee.toString());
    const tipInDecimal = new Decimal(tip.toString());

    const totalGas = baseFeeInDecimal.add(tipInDecimal);
    const totalGasInBN = BigNumber.from(Math.floor(totalGas.toNumber()));
    return formatUnits(totalGasInBN, 6);
  };

  estimateGas = loadingFunction<Estimate | undefined>(async ({ rpcUrl, walletPrivateKey, to, amount }: IEstimateGasParamsTEZ) => {
    try {
      const Tezos = new TezosToolkit(rpcUrl);
      Tezos.setProvider({
        signer: new InMemorySigner(walletPrivateKey),
      });
      return await Tezos.estimate.transfer({ to, amount });
    } catch (err) {
      console.log(err);
    }
  });
}
