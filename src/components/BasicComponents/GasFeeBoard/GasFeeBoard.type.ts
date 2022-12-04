import { BigNumber } from 'ethers';

import { TokenDto } from '@@generated/generated-scheme-clutch';

export interface IGasFeeBoardProps {
  isRevision: boolean;
  onConfirm: (param: TempParam) => Promise<string>;
  tokenDto: TokenDto;
}

//TODO 서비스에서 재지정
export interface TempParam {
  baseFee: BigNumber;
  tip?: BigNumber | null;
  gasLimit?: BigNumber | null;
}
