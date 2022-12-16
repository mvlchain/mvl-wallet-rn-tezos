import { BigNumber } from 'bignumber.js';

import { TokenDto } from '@@generated/generated-scheme-clutch';

export interface IConfirmSendModalProps {
  recipientAddress: string;
  amount: BigNumber;
  fee: string;
  onConfirm: Function;
  tokenDto: TokenDto;
}
