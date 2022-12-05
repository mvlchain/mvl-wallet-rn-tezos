import { BigNumber } from 'ethers';

import { TokenDto } from '@@generated/generated-scheme-clutch';

export interface IConfirmSendModalProps {
  recipientAddress: string;
  amount: BigNumber;
  fee: BigNumber;
  onConfirm: Function;
  tokenDto: TokenDto;
}
