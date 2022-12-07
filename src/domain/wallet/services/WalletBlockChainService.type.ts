import { TokenDto } from '@@generated/generated-scheme-clutch';

export interface IBalance {
  [key: string]: string;
}

export interface IBalanceData {
  ticker: string;
  balance: number;
  valuatedPrice: number;
  logoURI: string;
  tokenDto: TokenDto;
}
