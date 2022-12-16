import { BigNumber } from 'bignumber.js';
import { BytesLike } from 'ethers';

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
