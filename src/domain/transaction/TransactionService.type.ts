//TODO: generatedscheme에 있는지 확인하기
export enum TTransactionStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
}
export enum TTransactionType {
  SEND_ETH = 'SEND_ETH',
  SEND_ERC20 = 'SEND_ERC20',
  SEND_ERC721 = 'SEND_ERC721',
  SEND_BEP20 = 'SEND_BEP20',
  SEND_BEP20_BTCB = 'SEND_BEP20_BTCB',
  SEND_BNB = 'SEND_BNB',
  SEND_XTZ = 'SEND_XTZ',
}

export interface IFetchTransactionHistoryRequest {
  network: string;
  ticker: string;
  address: string;
  beforeblock?: number;
  beforeindex?: number;
  limit?: number;
}
export interface IFetchTransactionHistoryResponse {
  type: TTransactionType;
  status: TTransactionStatus;
  from: string;
  to: string;
  hash: string;
  value: string;
  fee: string;
  updatedAt: string;
  ticker: string;
  blockNumber: number;
  index: number;
  nonce: number;
}
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
  getHistory(reqBody: IFetchTransactionHistoryRequest): Promise<IFetchTransactionHistoryResponse[] | undefined>;
}
