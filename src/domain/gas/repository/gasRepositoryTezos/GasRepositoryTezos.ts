import { InMemorySigner } from '@taquito/signer';
import { Estimate, TezosToolkit, TransferParams } from '@taquito/taquito';
import { Tzip12Module, tzip12 } from '@taquito/tzip12';
import BigNumber from 'bignumber.js';
import { injectable } from 'tsyringe';

import { TEZOS_TOKEN_LIST } from '@@store/token/tokenPersistStore.constant';
import { formatBigNumber } from '@@utils/formatBigNumber';
import { loadingFunction } from '@@utils/loadingHelper';

import { IGetTotalGasFeeParamsTEZ, IGasRepositoryTezos, IEstimateGasParamsTEZ } from './GasRepositoryTezos.type';

@injectable()
export class GasRepositoryTezosImpl implements IGasRepositoryTezos {
  getTotalGasFee = ({ tip, baseFee }: IGetTotalGasFeeParamsTEZ) => {
    const totalGas = baseFee.plus(tip);
    return new BigNumber(totalGas);
  };

  estimateGas = loadingFunction<Estimate | undefined>(async ({ rpcUrl, walletPrivateKey, to, value, data }: IEstimateGasParamsTEZ) => {
    try {
      const Tezos = new TezosToolkit(rpcUrl);
      Tezos.setProvider({
        signer: new InMemorySigner(walletPrivateKey),
      });
      if (data) {
        const transferParams: TransferParams = JSON.parse(data);
        return await Tezos.estimate.transfer(transferParams);
      } else {
        if (!value) {
          throw new Error('value is required');
        }
        const valueInNumber = +formatBigNumber(value, TEZOS_TOKEN_LIST[0].decimals).toString(10);
        return await Tezos.estimate.transfer({ to, amount: valueInNumber });
      }
    } catch (err) {
      console.log(err);
    }
  });
}
