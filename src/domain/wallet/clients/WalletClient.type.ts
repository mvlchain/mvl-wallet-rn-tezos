export interface IWalletClient {
  createWalletWithEntropy(entropy: string | Uint8Array, derivePath?: string): Promise<IWallet>;
  createWalletWithMnemonic(mnemonic: string, derivePath?: string): Promise<IWallet>;
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
