export interface IFetchAllOptions {
  beforeblock?: number;
  beforeindex?: number;
  limit?: number;
}
//TODO: generatedscheme에 있는지 확인하기
export interface ITransaction {
  chainId?: number;
  data?: string;
  from: string;
  gas?: string;
  gasPrice?: string;
  gasUsed?: string;
  nonce?: string;
  to?: string;
  value?: string;
  maxFeePerGas?: string;
  maxPriorityFeePerGas?: string;
  estimatedBaseFee?: string;
  estimateGasError?: string;
}
export interface ITransactionService {
  sendTransaction(from: string, to: string, value: string, data: string | undefined): Promise<string>;
  approveTransaction(txId: string): Promise<string>;
  cancelTransaction(txId: string): Promise<string>;
  speedUpTransaction(txId: string): Promise<string>;
  estimateGas(transaction: ITransaction): Promise<string>;
  getHistory(network: string, ticker: string, address: string, opt?: IFetchAllOptions | undefined): Promise<string>;
}
