import { BigNumberish, BytesLike, BigNumber } from 'ethers';

import { NETWORK, Network, NetworkId, NETWORK_ID } from '@@constants/network.constant';
import { IGasFeeInfo } from '@@domain/gas/GasService.type';
import { TokenDto } from '@@generated/generated-scheme-clutch';
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

//TODO: 임시로 만들었는데 좋은 방법이 있을까요
export const getTransactionType = (networkId: NetworkId, isToken: boolean, isBtcb: boolean, isNft: boolean) => {
  if (isToken) {
    switch (networkId) {
      case NETWORK_ID.ETHEREUM:
        if (isNft) {
          return TTransactionType.SEND_ERC721;
        } else {
          return TTransactionType.SEND_ERC20;
        }
      case NETWORK_ID.BSC:
        if (isBtcb) {
          return TTransactionType.SEND_BEP20_BTCB;
        } else {
          return TTransactionType.SEND_BEP20;
        }
      case NETWORK_ID.XTZ:
        return TTransactionType.SEND_XTZ;
      default:
        null;
    }
  } else {
    switch (networkId) {
      case NETWORK_ID.ETHEREUM:
        return TTransactionType.SEND_ETH;
      case NETWORK_ID.BSC:
        return TTransactionType.SEND_BNB;
      case NETWORK_ID.XTZ:
        return TTransactionType.SEND_XTZ;
      default:
        null;
    }
  }
};

export interface INetworkInfo {
  rpcUrl: string;
  chainId: number;
}
export interface ITezosNetworkInfo extends Omit<INetworkInfo, 'chainId'> {}

export interface IGetHistoryParams {
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

export interface ISendTransactionRequest {
  selectedNetwork: Network;
  selectedWalletIndex: number;
  gasFeeInfo: IGasFeeInfo;
  to?: string;
  from?: BigNumber;
  value?: BigNumber;
  data?: BytesLike | null;
  contractAddress?: string;
}

export interface IRegisterTransactionRequest {
  network: NetworkId;
  type: TTransactionType;
  value: string;
  from: string;
  to: string;
  hash: string;
  data: BytesLike | null;
  nonce: 0;
}
export interface ITransactionService {
  encodeTransferData: (index: number, bip44: number, to: string, value: BigNumber) => Promise<BytesLike | undefined>;
  sendTransaction: ({
    selectedNetwork,
    selectedWalletIndex,
    gasFeeInfo,
    to,
    from,
    value,
    data,
  }: ISendTransactionRequest) => Promise<string | undefined>;
  getHistory: (params: IGetHistoryParams) => Promise<IGetTransactionHistoryResponse[] | []>;
  registerHistory: (params: IRegisterTransactionRequest) => Promise<void>;
}
