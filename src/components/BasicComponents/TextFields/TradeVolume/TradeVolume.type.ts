import { BigNumber } from 'bignumber.js';

import { TokenDto } from '@@generated/generated-scheme-clutch';

export interface ITradeVolumeComponentProps {
  useMax?: boolean;
  onSelect?: () => void;
  label?: string;
  tokenDto: TokenDto;
  value?: BigNumber | null;
  onChange: (amount: any) => void;
  iconUrl?: string;
  disableHint?: boolean;
  debounceTime?: number;
}
