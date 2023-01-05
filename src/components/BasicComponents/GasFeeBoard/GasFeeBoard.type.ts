import { Dispatch, SetStateAction } from 'react';

import { IGasFeeInfo } from '@@domain/gas/GasService.type';
import { TokenDto } from '@@store/token/tokenPersistStore.type';

export interface IGasFeeBoardProps {
  isRevision: boolean;
  onConfirm: (param: IGasFeeInfo) => Promise<void>;
  tokenDto: TokenDto;
  onConfirmTitle?: string;
  hideDivider?: boolean;
}
