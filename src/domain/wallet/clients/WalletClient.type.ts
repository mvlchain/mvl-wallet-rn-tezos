export interface IWalletClient {
  wallet: IWallet;
  createWalletWithEntropy(entropy: string | Uint8Array, derivePath?: string): Promise<void>;
  createWalletWithMnemonic(mnemonic: string, derivePath?: string): Promise<void>;
  getDerivePath(index: number): string;
}

export interface IWallet {
  address: string;
  publicKey: string;
  privateKey: string;
}

export type ExtendedKeyPair = {
  xprv: string;
  xpub: string;
};
