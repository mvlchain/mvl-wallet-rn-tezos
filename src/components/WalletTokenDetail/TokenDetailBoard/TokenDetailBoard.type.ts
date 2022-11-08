import { ReactNode } from 'react';

export interface ITokenDetailBoardProps {
  icon: ReactNode;
  symbol: string;
  balance: number;
  baseCurrencySymbol: string;
  baseCurrencyBalance: number;
}
