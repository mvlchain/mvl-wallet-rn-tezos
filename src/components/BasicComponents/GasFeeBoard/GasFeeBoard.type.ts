import { BigNumber } from 'ethers';

export interface IGasFeeBoardProps {
  isRevision: boolean;
  onConfirm: (param: TempParam) => Promise<string>;
}

//TODO 서비스에서 재지정
export interface TempParam {
  baseFee: BigNumber;
  tip?: BigNumber | null;
  gasLimit?: BigNumber | null;
}
