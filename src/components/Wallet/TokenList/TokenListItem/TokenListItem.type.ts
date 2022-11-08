import { WALLET_TOKEN } from '@@constants/token.constant';

export interface ITokenListItemProps {
  icon: keyof typeof WALLET_TOKEN;
  name: string;
  amount: number;
  amountUSD: number;
}
