import { ethers } from 'ethers';

export interface TransactionService {
  sendTransaction(from: string, to: string, value: string, data: string | undefined): Promise<string>;
}

export class EvmNetworkInfo {
  constructor(readonly rpcUrl: string, readonly chainId: number) {}
}

export class GasFeeInfo {
  constructor(readonly gasPrice: string) {}
}

export class EthersTransactionImpl implements TransactionService {
  constructor(
    private readonly selectedNetworkInfo: EvmNetworkInfo,
    private readonly selectedWalletPrivateKey: string,
    private readonly selectedGasFeeInfo: GasFeeInfo,
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
