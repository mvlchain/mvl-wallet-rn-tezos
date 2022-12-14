import { TokenDto } from '@@generated/generated-scheme-clutch';

export interface IReceiveQRModalProps {
  title: string;
  amount: string;
  token: TokenDto;
  address: string;
  qr: string;
  onCancel?: Function;
  cancelLabel?: string;
  onConfirm?: Function;
  confirmLabel?: string;
}

export interface IDeepLinkParam {
  token: TokenDto;
  address: string;
  value: string;
}
