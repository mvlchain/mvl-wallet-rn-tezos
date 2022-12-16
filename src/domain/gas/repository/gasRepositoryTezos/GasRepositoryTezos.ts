import { InMemorySigner } from '@taquito/signer';
import { Estimate, TezosToolkit } from '@taquito/taquito';
import { injectable } from 'tsyringe';

import { formatBigNumber } from '@@utils/formatBigNumber';
import { loadingFunction } from '@@utils/loadingHelper';

import { IGetTotalGasFeeParamsTEZ, IGasRepositoryTezos, IEstimateGasParamsTEZ } from './GasRepositoryTezos.type';

@injectable()
export class GasRepositoryTezosImpl implements IGasRepositoryTezos {
  getTotalGasFee = ({ tip, baseFee }: IGetTotalGasFeeParamsTEZ) => {
    const totalGas = baseFee.plus(tip);
    return formatBigNumber(totalGas, 6).toString(10);
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
