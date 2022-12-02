import { TransactionRequest } from '@ethersproject/abstract-provider';
import { BigNumberish, BytesLike, BigNumber } from 'ethers';
import { AccessListish } from 'ethers/lib/utils';

export interface ITransactionRequestBody {
  to?: string | null;
  from?: string | null;
  nonce?: BigNumber | null;
  gasLimit?: BigNumber | null;
  gasPrice?: BigNumber | null;
  data?: BytesLike | null;
  value?: BigNumber | null;
  chainId?: number | null;
  type?: number | null;
  accessList?: AccessListish | null;
  maxPriorityFeePerGas?: BigNumber | null;
  maxFeePerGas?: BigNumber | null;
  customData?: Record<string, any> | null;
  ccipReadEnabled?: boolean | null;
}
export interface ITransactionRequestStore extends ITransactionRequestBody {
  setBody: (newState: ITransactionRequestBody) => void;
  resetBody: () => void;
}
