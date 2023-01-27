export interface ISignModalProps {
  isVisible: boolean;
  signType: string;
  signMessageParams: any;
  onConfirm: () => void;
  onCancel: () => void;
  onClose: () => void;
}
