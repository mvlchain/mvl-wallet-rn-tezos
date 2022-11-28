import React, { ReactElement } from 'react';

import { IGasFeeInfo } from '@@domain/gas/repository/gasRepository/GasRepository.type';
import { IGasFeeInfoEip1559 } from '@@domain/gas/repository/gasRepositoryEip1559/GasRepositoryEip1559.type';

export interface IGasFeeBoardLayoutProps {
  isRevision: boolean;
  estimatedTime?: string;
  transactionFee: string;
  advanced: boolean;
  //TODO: any타입..
  GasFeeInputs: ReactElement<any, any>;
  GasLevelRadioButtons: ReactElement<any, any>;
  //TODO: onConfirm x타입 리팩토링
  onConfirm: ((gasFeeInfo: IGasFeeInfo) => void) | ((gasFeeInfo: IGasFeeInfoEip1559) => void);
  handleAdvanced: (v: any) => void;
}
