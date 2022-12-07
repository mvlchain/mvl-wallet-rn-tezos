import { TransactionRequest } from '@ethersproject/abstract-provider';
import { BigNumberish, BytesLike, BigNumber } from 'ethers';
import { AccessListish } from 'ethers/lib/utils';

export interface ITransactionRequestBody {
  to: string | null;
  from: string | null;
  data: BytesLike | null;
  value: BigNumber | null;
}
export interface ITransactionRequestStore extends ITransactionRequestBody {
  setBody: (newState: Partial<ITransactionRequestBody>) => void;
  resetBody: () => void;
}
