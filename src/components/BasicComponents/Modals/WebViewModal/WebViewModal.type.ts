export interface IWebViewModalProps {
  url: string;
  isVisible: boolean;
  children?: React.ReactNode;
  cancelLabel?: string;
  onCancel?: Function;
  confirmLabel?: string;
  onConfirm?: Function;
  isConfirmDisabled?: boolean;
  onBackDropPress?: () => void;
}
