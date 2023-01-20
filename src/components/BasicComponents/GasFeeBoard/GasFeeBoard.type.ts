import { TransactionRequest } from '@ethersproject/abstract-provider';
import { TransferParams } from '@taquito/taquito';
import BigNumber from 'bignumber.js';
import { BytesLike } from 'ethers';

export interface IUseGasProps {
  to: string | null;
  value?: BigNumber | null;
  data?: BytesLike | null;
  isValidInput: boolean;
  onConfirm: (params: TransactionRequest | TransferParams) => void;
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
