import { ReactChildren } from 'react-native-toast-message';

import { TOnConfirmEip1559, TOnConfirmEthers, TOnConfirmTezos } from '../GasFeeBoard.type';

export interface IGasFeeBoardLayoutProps {
  isRevision: boolean;
  estimatedTime?: string;
  transactionFee: string;
  advanced: boolean;
  children: ReactChildren[];
  //TODO: 타입
  onConfirm: TOnConfirmEip1559 | TOnConfirmEthers | TOnConfirmTezos;
  //TODO:타입
  toggleGasAdvanced: (v: any) => void;
}
