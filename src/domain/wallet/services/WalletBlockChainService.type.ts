export interface IBalance {
  [key: string]: string;
}

export interface IBalanceData {
  ticker: string;
  balance: number;
  valuatedPrice: number;
  logoURI: string;
}
