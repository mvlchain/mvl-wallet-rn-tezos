import { ReactChildren } from 'react-native-toast-message';

export interface IGasFeeBoardLayoutProps {
  isRevision: boolean;
  estimatedTime?: string;
  advanced: boolean;
  children: ReactChildren[];
  //TODO: 타입
  onConfirm: Function;
  //TODO:타입
  toggleGasAdvanced: (v: any) => void;
  isValid: () => boolean;
}
