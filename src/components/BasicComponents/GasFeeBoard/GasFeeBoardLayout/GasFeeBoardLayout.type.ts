import React, { ReactElement } from 'react';

import { ReactChildren } from 'react-native-toast-message';

import { IGasFeeInfo } from '@@domain/gas/repository/gasRepository/GasRepository.type';
import { IGasFeeInfoEip1559 } from '@@domain/gas/repository/gasRepositoryEip1559/GasRepositoryEip1559.type';

export interface IGasFeeBoardLayoutProps {
  isRevision: boolean;
  estimatedTime?: string;
  transactionFee: string;
  advanced: boolean;
  children: ReactChildren[];
  //TODO: onConfirm x타입 리팩토링
  onConfirm: ((gasFeeInfo: IGasFeeInfo) => void) | ((gasFeeInfo: IGasFeeInfoEip1559) => void);
  handleAdvanced: (v: any) => void;
}
