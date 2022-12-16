import { BigNumber } from 'bignumber.js';
import { ReactChildren } from 'react-native-toast-message';

import { IGasFeeInfo } from '@@domain/gas/GasService.type';
export interface IGasFeeBoardLayoutProps {
  isRevision: boolean;
  estimatedTime?: string;
  transactionFee: string;
  advanced: boolean;
  children: ReactChildren[];
  //TODO: 타입
  onConfirm: Function;
  //TODO:타입
  toggleGasAdvanced: (v: any) => void;
  isValid: () => boolean;
}
