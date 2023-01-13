import { RefObject, Ref } from 'react';

import { BigNumber } from 'bignumber.js';
import { TextInput } from 'react-native';

import { TokenDto } from '@@store/token/tokenPersistStore.type';

export interface ITradeVolumeComponentProps {
  label?: string;
  tokenDto: TokenDto;
  debounceTime?: number;
  editable?: boolean;
  useMax?: boolean;
  iconUrl?: string;
  hideBalance?: boolean;
  disableDelete?: boolean;
  ref?: RefObject<TextInput>;
  value: BigNumber | null;
  setValue: (value: BigNumber) => void;
  setValueValid?: (valid: boolean) => void;
  handleTokenSelect?: () => void;
}
