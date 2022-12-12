import { TokenDto } from '@@generated/generated-scheme-clutch';

export interface IAmountInputModalProps {
  title: string;
  tokenDto: TokenDto;
  defaultValue?: string;
  onCancel?: Function;
  cancelLabel?: string;
  onConfirm?: (value: string, decimals: number) => void;
  confirmLabel?: string;
}
