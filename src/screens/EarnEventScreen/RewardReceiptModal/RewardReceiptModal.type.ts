import * as Type from '@@components/BasicComponents/Modals/BaseModal/Modal.type';

export interface IRewardReceiptModalProps {
  url: string;
  cancelLabel?: string;
  onCancel?: Function;
  confirmLabel?: string;
  onConfirm?: Function;
  isConfirmDisabled?: boolean;
  onBackDropPress?: () => void;
}
