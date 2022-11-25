export interface ITextInputModalProps {
  title: string;
  defaultValue?: string;
  onCancel?: Function;
  cancelLabel?: string;
  onConfirm?: (value: string) => void;
  confirmLabel?: string;
}
