import { BigNumber } from 'ethers';

export interface IConfirmSendModalProps {
  recipientAddress: string;
  amount: BigNumber;
  fee: BigNumber;
  onConfirm: Function;
}
