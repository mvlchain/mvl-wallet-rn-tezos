import BigNumber from 'bignumber.js';
import { ReactChildren } from 'react-native-toast-message';
export interface IGasLayoutProps {
  isRevision: boolean;
  hideDivider?: boolean;
  total: BigNumber | null;
  estimatedTime?: string;
  onConfirm: () => void;
  onConfirmTitle?: string;
  onConfirmValid: boolean;
  advanced: boolean;
  toggleGasAdvanced: (v: any) => void;
  children: ReactChildren[];
}
