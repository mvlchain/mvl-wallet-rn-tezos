import { Dispatch, SetStateAction } from 'react';

import BigNumber from 'bignumber.js';
import { BytesLike } from 'ethers';

import { IGasFeeInfo } from '@@domain/gas/GasService.type';
import { TokenDto } from '@@store/token/tokenPersistStore.type';

export type TGasConfirmButtonFunctionParam = {
  to: string;
  value?: BigNumber | null;
  data?: BytesLike | null;
  gasFeeInfo: IGasFeeInfo;
};
export interface IGasFeeBoardProps {
  isRevision: boolean;
  onConfirm: (param: TGasConfirmButtonFunctionParam) => void;
  tokenDto: TokenDto;
  onConfirmTitle?: string;
  hideDivider?: boolean;
  to?: string | null;
  value?: BigNumber | null;
  data?: BytesLike | null;
  isValidInput: boolean;
}

export interface IUseGasFeeBoard {
  to?: string | null;
  value?: BigNumber | null;
  data?: BytesLike | null;
  isValidInput: boolean;
  tokenDto: TokenDto;
  onConfirm: (gas: TGasConfirmButtonFunctionParam) => void;
}
