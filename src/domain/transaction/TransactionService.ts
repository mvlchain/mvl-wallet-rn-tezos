import { InMemorySigner } from '@taquito/signer';
import { TezosToolkit } from '@taquito/taquito';
import { ethers } from 'ethers';
import { formatEther } from 'ethers/lib/utils';

export interface TransactionService {
  sendTransaction(from: string, to: string, value: string, data: string | undefined): Promise<string>;
}

export class EvmNetworkInfo {
  constructor(readonly rpcUrl: string, readonly chainId: number) {}
}

export class TezosNetworkInfo {
  constructor(readonly rpcUrl: string) {}
}

export class GasFeeInfo {
  constructor(readonly gasPrice: string) {}
}

export class EthersTransactionImpl implements TransactionService {
  constructor(
    private readonly selectedNetworkInfo: EvmNetworkInfo,
    private readonly selectedWalletPrivateKey: string,
    private readonly selectedGasFeeInfo: GasFeeInfo
  ) {}

  async sendTransaction(from: string, to: string, value: string, data: string | undefined): Promise<string> {
    const provider = new ethers.providers.JsonRpcProvider(this.selectedNetworkInfo.rpcUrl);

    const wallet = new ethers.Wallet(this.selectedWalletPrivateKey, provider);

    const res = await wallet.sendTransaction({
      from,
      to,
      data,
      value,
      gasPrice: this.selectedGasFeeInfo.gasPrice,
      chainId: this.selectedNetworkInfo.chainId,
    });

    return res.hash;
  }
}

export class TezosTaquitoTransactionsImpl implements TransactionService {
  constructor(
    private readonly selectedNetworkInfo: TezosNetworkInfo,
    private readonly selectedWalletPrivateKey: string,
    private readonly selectedGasFeeInfo: GasFeeInfo
  ) {}

  // Tezos는 general한 sendTransaction을 raw string data를 활용하는 방식으로 구현하기 어려워서 transfer 기준으로 일단 구현
  async sendTransaction(from: string, to: string, value: string, data: string | undefined): Promise<string> {
    const Tezos = new TezosToolkit(this.selectedNetworkInfo.rpcUrl);
    Tezos.setProvider({
      signer: new InMemorySigner(this.selectedWalletPrivateKey),
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
        to: to,
        // FIXME: use decimal js?
        amount: parseFloat(formatEther(value)),
        fee: Number(this.selectedGasFeeInfo.gasPrice),
      })
      .send()
      .then((op) => op.confirmation(1).then(() => op.opHash));
    console.log(`txHash: ${txHash}`);
    return txHash;
  }
}
