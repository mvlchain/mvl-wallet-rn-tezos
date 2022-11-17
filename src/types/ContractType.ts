import { valueOf } from '@@types/etc';

export interface IBep20Token {
  contractAddress: string; // Contract address only for tokens (Not for coins)
  tokenName: string; // Enum use 'name' as the same instance name
  symbol: string;
  decimal: number;
  gasLimit: number;
  cryptoType: TCrypto;
}

export interface IErc20Token {
  contractAddress: string; // Contract address only for tokens (Not for coins)
  tokenName: string; // Enum use 'name' as the same instance name
  symbol: string;
  decimal: number;
  gasLimit: number;
  cryptoType: TCrypto;
}

export const CryptoType = {
  COIN: 'COIN',
  TOKEN: 'TOKEN',
} as const;

export type TCrypto = valueOf<typeof CryptoType>;
