import { BigNumber } from 'bignumber.js';

import { TokenDto } from '@@generated/generated-scheme-clutch';

export interface IConfirmSendModalProps {
  onConfirm: Function;
  tokenDto: TokenDto;
}
