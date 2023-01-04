export interface ITrade extends ITradeState {
  selectToken: (symbol: string, type: 'from' | 'to') => void;
}

export interface ITradeState {
  selectedToken: {
    from: string;
    to: string;
  };
}
