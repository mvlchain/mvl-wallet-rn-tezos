import { BigNumber } from 'bignumber.js';

// import { TokenDto } from '@@generated/generated-scheme-clutch';
import { TokenDto } from '@@store/token/tokenPersistStore.type';

export interface IConfirmSendModalProps {
  onConfirm: Function;
  tokenDto: TokenDto;
}
