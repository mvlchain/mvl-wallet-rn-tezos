export interface ITokenListItemProps {
  asset: Asset;
  amount: string;
  valuatedAmount: string;
  valuatedCurrency: string;
}

export interface Asset {
  ticker: string;
  name: string;
  iconUrl: string;
  tokenType: string | null;
}
