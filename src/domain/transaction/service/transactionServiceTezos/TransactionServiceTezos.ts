import '@ethersproject/shims';

import { InMemorySigner } from '@taquito/signer';
import { TezosToolkit, TransferParams } from '@taquito/taquito';
import qs from 'qs';
import { injectable } from 'tsyringe';

import { Network, getNetworkConfig } from '@@constants/network.constant';

import { ITransactionServiceTezos } from './TransactionServiceTezos.type';

@injectable()
export class TransactionServiceTezos implements ITransactionServiceTezos {
  constructor() {}

  // Tezos는 general한 sendTransaction을 raw string data를 활용하는 방식으로 구현하기 어려워서 transfer 기준으로 일단 구현
  async sendTransaction(selectedNetwork: Network, selectedWalletPrivateKey: string, params: TransferParams): Promise<string> {
    const network = getNetworkConfig(selectedNetwork);
    const Tezos = new TezosToolkit(network.rpcUrl);
    Tezos.setProvider({
      signer: new InMemorySigner(selectedWalletPrivateKey),
    });

    // 나중에 methodName과 methodArgumentObject 를 밖에서 받아서 구현할 수 있을 때 참고
    // const contract = await Tezos.contract.at(to);
    // const methodName = 'methodName';
    // const methodArgumentObject = {};
    // const txHash = await contract.methodsObject[methodName](methodArgumentObject)
    //   .send({
    //     fee: Number(this.selectedGasFeeInfo.gasPrice),
    //   })
    //   .then((op) => op.confirmation(1).then(() => op.hash));

    const txHash = await Tezos.wallet
      .transfer({
        ...params,
      })
      .send()
      .then((op) => op.confirmation(1).then(() => op.opHash));

    return txHash;
  }
  async approveTransaction(selectedNetwork: Network, selectedWalletPrivateKey: string, params: TransferParams) {
    const network = getNetworkConfig(selectedNetwork);
    const Tezos = new TezosToolkit(network.rpcUrl);
    Tezos.setProvider({
      signer: new InMemorySigner(selectedWalletPrivateKey),
    });

    const txHash = await Tezos.wallet.batch;

    return '';
  }
}
