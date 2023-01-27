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
  textInputRef?: RefObject<TextInput>;
  value: BigNumber | null;
  forceBalanceUpdate?: boolean; //TODO: 향후 balance를 정리하면 좀더 좋은 방법으로 업데이트 가능할 것임..//트레이드볼륨 강제 업데이트를 위한 값 true false는 중요하지않고 토글로 이용
  setValue: (value: BigNumber | null) => void;
  setValueValid?: (valid: boolean) => void;
  handleTokenSelect?: () => void;
}
