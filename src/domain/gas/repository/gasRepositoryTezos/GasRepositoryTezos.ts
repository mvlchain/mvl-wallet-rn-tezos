import { InMemorySigner } from '@taquito/signer';
import { TezosToolkit } from '@taquito/taquito';
import { createNewPollingBasedHeadObservable } from '@taquito/taquito/dist/types/wallet/operation-factory';
import Decimal from 'decimal.js';
import { BigNumber, ethers } from 'ethers';
import { formatEther, formatUnits } from 'ethers/lib/utils';
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

  estimateGas = async ({ rpcUrl, walletPrivateKey, to, amount }: IEstimateGasParamsTEZ) => {
    try {
      const Tezos = new TezosToolkit(rpcUrl);
      Tezos.setProvider({
        signer: new InMemorySigner(walletPrivateKey),
      });
      return await Tezos.estimate.transfer({ to, amount });
    } catch (err) {
      console.log(err);
    }
  };
}
