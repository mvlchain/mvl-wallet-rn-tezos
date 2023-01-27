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
  initialLevel?: TGasLevel;
  isHoldingGasEstimatePolling?: boolean; //true일때 주기적 가스 계산을 중단합니다. 가스피를 확정지었는지 여부는 가스피 내부 판단이 아닌 상위에 존재하므로 prop으로 설정하였습니다.
  onConfirm?: (params: TransactionRequest | TransferParams, gasSettingInfo: IGasSettingInfo) => void;
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
export interface IGasSettingInfo {
  advanced: boolean;
  level: TGasLevel;
}
