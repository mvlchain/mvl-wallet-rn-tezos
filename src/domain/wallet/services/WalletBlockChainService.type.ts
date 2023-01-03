import { TokenDto } from '@@store/token/tokenPersistStore.type';
// // import { TokenDto } from '@@generated/generated-scheme-clutch';
export interface IBalance {
  [key: string]: string;
}

export interface IBalanceData {
  ticker: string;
  balance: number;
  valuatedPrice: number;
  logoURI: string | undefined;
  tokenDto: TokenDto;
}
