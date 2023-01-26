import { SvgProps } from 'react-native-svg';

import { TModalPosition } from '../BaseModal/Modal.type';

export interface IImageBackgroundModalProps {
  title: string;
  Image: React.FC<SvgProps>;
  description: string;
  onConfirm: Function;
  confirmLabel?: string;
  onClose?: Function;
  modalPosition: TModalPosition;
  onCancel?: Function;
  cancelLabel?: string;
}
