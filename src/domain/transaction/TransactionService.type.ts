import { Estimate, TransferParams } from '@taquito/taquito';
import { BigNumberish, BytesLike } from 'ethers';

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

export enum TToken {
  ETH = 'ETH',
  ERC20 = 'ERC20',
  ERC721 = 'ERC721',
  BEP20 = 'BEP20',
  BEP20_BTCB = 'BEP20_BTCB',
  BNB = 'BNB',
  XTZ = 'XTZ',
}

export interface INetworkInfo {
  rpcUrl: string;
  chainId: number;
}
export interface ITezosNetworkInfo extends Omit<INetworkInfo, 'chainId'> {}
export interface IGasFeeInfo {
  gasPrice: BigNumberish;
  gasLimit: BigNumberish;
}

export interface ITezosEstimateArguments extends TransferParams {
  networkInfo: ITezosNetworkInfo;
  privateKey: string;
  to: string;
  value: number;
}
export interface ISendTransactionArguments {
  networkInfo: INetworkInfo;
  privateKey: string;
  gasFeeInfo: IGasFeeInfo;
  from: string;
  to: string;
  value: BigNumberish;
  data?: BytesLike;
}

export interface ITezosSendTransactionArguments extends Omit<ISendTransactionArguments, 'networkInfo'> {
  networkInfo: ITezosNetworkInfo;
}

export interface IGetHistoryArguments {
  network: string;
  ticker: string;
  address: string;
  beforeblock?: number;
  beforeindex?: number;
  limit?: number;
}
export interface IGetTransactionHistoryResponse {
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
  sendTransaction(args: ISendTransactionArguments): Promise<string>;
  approveTransaction(args: ISendTransactionArguments): Promise<string>;
  cancelTransaction(txId: string): Promise<string>;
  speedUpTransaction(txId: string): Promise<string>;
  estimateGas(args: ISendTransactionArguments | ITezosEstimateArguments): Promise<BigNumberish | Estimate>;
  getHistory(args: IGetHistoryArguments): Promise<IGetTransactionHistoryResponse[] | undefined>;
}
