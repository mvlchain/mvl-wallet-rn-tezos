import { InMemorySigner } from '@taquito/signer';
import { TezosToolkit, TransferParams, WalletOperation } from '@taquito/taquito';
import { tzip12, Tzip12Module } from '@taquito/tzip12';
import { injectable, inject } from 'tsyringe';

import { Network, getNetworkConfig } from '@@constants/network.constant';
import { WalletService } from '@@domain/wallet/services/WalletService';
import { faType } from '@@utils/faType';
import { loadingFunction } from '@@utils/loadingHelper';

import { IGetTransferParam, ITransactionServiceTezos } from './TransactionServiceTezos.type';
@injectable()
export class TransactionServiceTezos implements ITransactionServiceTezos {
  constructor(@inject('WalletService') private walletService: WalletService) {}

  getTransferParam = loadingFunction<TransferParams>(
    async ({ selectedNetwork, selectedWalletIndex, to, amount, contractAddress }: IGetTransferParam) => {
      const network = getNetworkConfig(selectedNetwork);
      const Tezos = new TezosToolkit(network.rpcUrl);
      const walletInfo = await this.walletService.getWalletInfo({ index: selectedWalletIndex, network: selectedNetwork });
      Tezos.setProvider({
        signer: new InMemorySigner(walletInfo.privateKey),
      });
      const contract = await Tezos.wallet.at(contractAddress, tzip12);
      Tezos.addExtension(new Tzip12Module());
      let params;
      const from = walletInfo.address;
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
      return params;
    }
  );
  // Tezos는 general한 sendTransaction을 raw string data를 활용하는 방식으로 구현하기 어려워서 transfer 기준으로 일단 구현
  sendTransaction = loadingFunction<WalletOperation>(async (selectedNetwork: Network, selectedWalletIndex: number, params: TransferParams) => {
    const network = getNetworkConfig(selectedNetwork);
    const Tezos = new TezosToolkit(network.rpcUrl);
    const walletInfo = await this.walletService.getWalletInfo({ index: selectedWalletIndex, network: selectedNetwork });
    Tezos.setProvider({
      signer: new InMemorySigner(walletInfo.privateKey),
    });

    return await Tezos.wallet
      .transfer({
        ...params,
      })
      .send();

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
