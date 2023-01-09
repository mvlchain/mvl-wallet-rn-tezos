import { Network } from '@@constants/network.constant';
import {
  BroadcastTransactionDto,
  CreateNativeSwapTransactionResponseDto,
  FetchPriceResponseDto,
  SimpleResponseDto,
  SpenderResponseDto,
  TokensResponseDto,
} from '@@generated/generated-scheme-clutch';

export interface ITradeRepository {
  getSpender: (network: Network) => Promise<SpenderResponseDto[]>;
  getTokens: (network: Network) => Promise<TokensResponseDto>;
  quote: (network: Network, quoteDto: IQuoteDto) => Promise<FetchPriceResponseDto>;
  swap: (network: Network, swapDto: ISwapDto) => Promise<CreateNativeSwapTransactionResponseDto>;
  broadcast: (network: Network, broadcastDto: BroadcastTransactionDto) => Promise<SimpleResponseDto>;
}

export interface IQuoteDto {
  fromTokenAddress: string;
  toTokenAddress: string;
  amount: string;
  fee?: string;
  protocols?: string;
  gasPrice?: string;
  complexityLevel?: string;
  connectorTokens?: string;
  gasLimit?: string;
  mainRouteParts?: string;
  parts?: string;
}

export interface ISwapDto {
  fromTokenAddress: string;
  toTokenAddress: string;
  amount: string;
  fromAddress: string;
  slippage?: number;
  protocols?: string;
  destReceiver?: string;
  referrerAddress?: string;
  fee?: string;
  gasPrice?: string;
  disableEstimate?: boolean;
  permit?: string;
  burnChi?: boolean;
  allowPartialFill?: boolean;
  parts?: string;
  mainRouteParts?: string;
  connectorTokens?: string;
  complexityLevel?: string;
  gasLimit?: string;
}
