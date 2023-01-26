import { TransactionRequest } from '@ethersproject/abstract-provider';
import { TransferParams } from '@taquito/taquito';
import BigNumber from 'bignumber.js';
import { BytesLike } from 'ethers';

import { TGasLevel } from '@@constants/gas.constant';

export interface IUseGasProps {
  to: string | null;
  value?: BigNumber | null;
  data?: BytesLike | null;
  isValidInput: boolean;
  onConfirm?: (params: TransactionRequest | TransferParams, gasSettingInfo?: IGasSettingInfo) => void;
}
export interface IEVMGasComponentProps extends IUseGasProps {
  isRevision: boolean;
  hideDivider: boolean;
  onConfirmTitle?: string;
}

export interface ITezosUseGasProps extends Omit<IUseGasProps, 'data'> {
  transferParam?: TransferParams | null;
}

export interface ITezosGasComponentProps extends ITezosUseGasProps, Omit<IEVMGasComponentProps, 'data'> {}
export interface IGasComponentProps extends ITezosGasComponentProps, IEVMGasComponentProps {}

export interface IGasInjectParamToOnConfirm {
  to: string;
  value?: BigNumber | null;
  sendParam: TransactionRequest | TransferParams;
}

export interface IGasSettingInfo {
  advanced: boolean;
  level: TGasLevel;
}
