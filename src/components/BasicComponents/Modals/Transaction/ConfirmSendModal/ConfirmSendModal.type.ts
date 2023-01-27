import { BigNumber } from 'bignumber.js';

import { TokenDto } from '@@store/token/tokenPersistStore.type';

export interface IConfirmSendModalProps {
  onConfirm: Function;
  onClose: Function;
  tokenDto: TokenDto;
  to: string;
  value: BigNumber;
}
