export interface IBalance {
  [key: string]: string;
}

export interface IBalanceData {
  ticker: string;
  balance: number;
  valuatedAmount: number;
}
