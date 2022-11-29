import React, { ReactElement } from 'react';

import { ReactChildren } from 'react-native-toast-message';

import { TOnConfirmEip1559, TOnConfirmEthers, TOnConfirmTezos } from '../GasFeeBoard.type';

export interface IGasFeeBoardLayoutProps {
  isRevision: boolean;
  estimatedTime?: string;
  transactionFee: string;
  advanced: boolean;
  children: ReactChildren[];
  //TODO: onConfirm x타입 리팩토링
  onConfirm: TOnConfirmEip1559 | TOnConfirmEthers | TOnConfirmTezos;
  handleAdvanced: (v: any) => void;
}
