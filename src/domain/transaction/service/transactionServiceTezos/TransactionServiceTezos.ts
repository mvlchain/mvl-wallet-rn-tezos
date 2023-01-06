import { InMemorySigner } from '@taquito/signer';
import { TezosToolkit, TransferParams } from '@taquito/taquito';
import { tzip12, Tzip12Module } from '@taquito/tzip12';
import { injectable } from 'tsyringe';

import { Network, getNetworkConfig } from '@@constants/network.constant';
import { faType } from '@@utils/faType';
import { loadingFunction } from '@@utils/loadingHelper';

import { ITransactionServiceTezos } from './TransactionServiceTezos.type';
@injectable()
export class TransactionServiceTezos implements ITransactionServiceTezos {
  constructor() {}

  getTransferData = async (
    selectedNetwork: Network,
    selectedWalletPrivateKey: string,
    from: string,
    to: string,
    amount: number,
    contractAddress: string
  ) => {
    const network = getNetworkConfig(selectedNetwork);
    const Tezos = new TezosToolkit(network.rpcUrl);
    Tezos.setProvider({
      signer: new InMemorySigner(selectedWalletPrivateKey),
    });
    const contract = await Tezos.wallet.at(contractAddress, tzip12);
    Tezos.addExtension(new Tzip12Module());
    let params;
    if (faType(contractAddress) === 'fa12') {
      params = contract.methods.transfer(from, to, amount).toTransferParams();
    } else {
      params = contract.methods
        .transfer([
          {
            from_: from,
            txs: [
              {
                to_: to,
                token_id: 0,
                amount: amount,
              },
            ],
          },
        ])
        .toTransferParams();
    }
    return JSON.stringify(params);
  };
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
// it('send fa2 token', async () => {
//   return;
//   jest.setTimeout(50000);
