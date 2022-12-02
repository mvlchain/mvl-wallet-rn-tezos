export interface IWalletClient {
  wallet: IWallet | null;
  address: string | undefined;
  publicKey: string | undefined;
  privateKey: string | undefined;
  createWalletWithEntropy(entropy: string | Uint8Array, derivePath?: string): Promise<void>;
  createWalletWithMnemonic(mnemonic: string, derivePath?: string): Promise<void>;
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
