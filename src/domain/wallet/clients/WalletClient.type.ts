export interface IWalletClient {
  createWalletWithEntropy(entropy: string | Uint8Array, index?: number): Promise<IWallet>;
  createWalletWithMnemonic(mnemonic: string, index?: number): Promise<IWallet>;
  getDerivationPath(index: number): string;
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
