import { InMemorySigner } from '@taquito/signer';
import { Estimate, TezosToolkit, TransferParams } from '@taquito/taquito';
import { injectable, inject } from 'tsyringe';

import { Network, getNetworkConfig } from '@@constants/network.constant';
import { WalletService } from '@@domain/wallet/services/WalletService';
import { loadingFunction } from '@@utils/loadingHelper';

import { IGasRepositoryTezos } from './GasRepositoryTezos.type';

@injectable()
export class GasRepositoryTezosImpl implements IGasRepositoryTezos {
  constructor(@inject('WalletService') private walletService: WalletService) {}
  estimateGas = loadingFunction<Estimate | undefined>(async (selectedNetwork: Network, selectedWalletIndex: number, param: TransferParams) => {
    try {
      const network = getNetworkConfig(selectedNetwork);
      const walletInfo = await this.walletService.getWalletInfo({ index: selectedWalletIndex, network: selectedNetwork });
      const Tezos = new TezosToolkit(network.rpcUrl);
      Tezos.setProvider({
        signer: new InMemorySigner(walletInfo.privateKey),
      });
      return await Tezos.estimate.transfer(param);
    } catch (err) {
      console.log(err);
    }
  });
}
