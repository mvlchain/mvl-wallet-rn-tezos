import { BigNumber } from 'bignumber.js';
import { BytesLike } from 'ethers';

export interface ITransactionRequestBody {
  to: string | null;
  from: string | null;
  data: BytesLike | null;
  value: BigNumber | null;
  tokenTo: string | null;
  tokenValue: BigNumber | null;
  toValid: boolean;
  valueValid: boolean;
}
export interface ITransactionRequestStore extends ITransactionRequestBody {
  setState: (newState: Partial<ITransactionRequestBody>) => void;
  resetBody: () => void;
}
