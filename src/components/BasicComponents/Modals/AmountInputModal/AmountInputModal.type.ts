import { TokenDto } from '@@store/token/tokenPersistStore.type';

export interface IAmountInputModalProps {
  title: string;
  tokenDto: TokenDto;
  defaultValue?: string;
  onCancel?: Function;
  cancelLabel?: string;
  onConfirm?: (value: string, token: TokenDto) => void;
  confirmLabel?: string;
}
