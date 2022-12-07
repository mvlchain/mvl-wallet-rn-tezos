import { BigNumber, BigNumberish } from 'ethers';

export interface ISendInputBoardProps {
  amount: BigNumber | null;
  setAmount: (amount: BigNumber) => void;
  address: string | null;
  setAddress: (address: string) => void;
}
