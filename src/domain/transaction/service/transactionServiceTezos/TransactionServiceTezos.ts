import { InMemorySigner } from '@taquito/signer';
import { TezosToolkit, TransferParams } from '@taquito/taquito';
import { tzip12, Tzip12Module } from '@taquito/tzip12';
import Decimal from 'decimal.js';
import { injectable } from 'tsyringe';

import { Network, getNetworkConfig } from '@@constants/network.constant';
import { loadingFunction } from '@@utils/loadingHelper';

import { ITezosContractTransferParam, ITezosData, ITransactionServiceTezos } from './TransactionServiceTezos.type';
@injectable()
export class TransactionServiceTezos implements ITransactionServiceTezos {
  constructor() {}

  // Tezos는 general한 sendTransaction을 raw string data를 활용하는 방식으로 구현하기 어려워서 transfer 기준으로 일단 구현
  sendTransaction = loadingFunction<string>(async (selectedNetwork: Network, selectedWalletPrivateKey: string, params: TransferParams) => {
    const network = getNetworkConfig(selectedNetwork);
    const Tezos = new TezosToolkit(network.rpcUrl);
    Tezos.setProvider({
      signer: new InMemorySigner(selectedWalletPrivateKey),
    });

    const op = await Tezos.wallet
      .transfer({
        ...params,
      })
      .send();
    return op.opHash;

    // .then((op) => op.confirmation(1).then(() => op.opHash));
  });

  sendContractTransaction = loadingFunction<string>(
    async (selectedNetwork: Network, selectedWalletPrivateKey: string, params: ITezosContractTransferParam) => {
      const network = getNetworkConfig(selectedNetwork);
      const Tezos = new TezosToolkit(network.rpcUrl);
      Tezos.setProvider({
        signer: new InMemorySigner(selectedWalletPrivateKey),
      });
      Tezos.addExtension(new Tzip12Module());
      const fa1_2TokenContract = await Tezos.wallet.at(params.to, tzip12);

      const metadata = await fa1_2TokenContract.tzip12().getTokenMetadata(0);
      const decimals = metadata.decimals;
      const data: ITezosData = JSON.parse(params.data);
      const amount = new Decimal(data.value).mul(Decimal.pow(10, decimals)).toFixed();
      const op = await fa1_2TokenContract.methods.transfer(data.from, data.to, amount).send();
      return op.opHash;
      // await op.confirmation();
      // return op.opHash;
    }
  );
}

// 나중에 methodName과 methodArgumentObject 를 밖에서 받아서 구현할 수 있을 때 참고
// const contract = await Tezos.contract.at(to);
// const methodName = 'methodName';
// const methodArgumentObject = {};
// const txHash = await contract.methodsObject[methodName](methodArgumentObject)
//   .send({
//     fee: Number(this.selectedGasFeeInfo.gasPrice),
//   })
//   .then((op) => op.confirmation(1).then(() => op.hash));
