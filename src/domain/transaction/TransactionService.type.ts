import { BigNumberish, BytesLike, BigNumber } from 'ethers';

import { IGasFeeInfo } from '@@domain/gas/repository/gasRepository/GasRepository.type';

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

//TODO: getGasFee에서 얻는 값자체가 null 아니면 bignumber인데 값 입력시에는 null안받음 어떻게 할까.
//IGasFeeEip1559랑 중복됨 null만없음
export interface ISendTransactionGasFee {
  maxFeePerGas: BigNumber;
  maxPriorityFeePerGas: BigNumber;
  gasLimit: BigNumber;
}
export interface ISendTransactionArgs {
  networkInfo: INetworkInfo;
  privateKey: string;
  gasFeeInfo: IGasFeeInfo | ISendTransactionGasFee;
  to: string;
  from: string;
  value: BigNumberish;
  data?: BytesLike;
}
export interface ITezosSendTransactionArgs {
  networkInfo: ITezosNetworkInfo;
  privateKey: string;
  gasFeeInfo: IGasFeeInfo;
  to: string;
  from: string;
  value: BigNumberish;
  data?: BytesLike;
}

export interface IGetHistoryArgs {
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
  sendTransaction(args: ISendTransactionArgs | ITezosSendTransactionArgs): Promise<string>;
  approveTransaction(args: ISendTransactionArgs): Promise<string>;
  getHistory(args: IGetHistoryArgs): Promise<IGetTransactionHistoryResponse[] | []>;
}
