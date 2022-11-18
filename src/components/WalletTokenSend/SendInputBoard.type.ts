import { TextInputChangeEventData } from 'react-native';

export interface ISendInputBoardProps {
  amount: string;
  setAmount: (amount: string) => void;
  address: string;
  setAddress: (address: string) => void;
}
