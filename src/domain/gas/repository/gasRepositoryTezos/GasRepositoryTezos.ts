import { InMemorySigner } from '@taquito/signer';
import { Estimate, TezosToolkit, TransferParams } from '@taquito/taquito';
import { Tzip12Module, tzip12 } from '@taquito/tzip12';
import BigNumber from 'bignumber.js';
import { injectable } from 'tsyringe';

import { TEZOS_TOKEN_LIST } from '@@store/token/tokenPersistStore.constant';
import { formatBigNumber } from '@@utils/formatBigNumber';
import { loadingFunction } from '@@utils/loadingHelper';

import { IGasRepositoryTezos, IEstimateGasParamsTEZ } from './GasRepositoryTezos.type';

@injectable()
export class GasRepositoryTezosImpl implements IGasRepositoryTezos {
  estimateGas = loadingFunction<Estimate | undefined>(async ({ rpcUrl, walletPrivateKey, param }: IEstimateGasParamsTEZ) => {
    try {
      const Tezos = new TezosToolkit(rpcUrl);
      Tezos.setProvider({
        signer: new InMemorySigner(walletPrivateKey),
      });
      return await Tezos.estimate.transfer(param);
    } catch (err) {
      console.log(err);
    }
  });
}
