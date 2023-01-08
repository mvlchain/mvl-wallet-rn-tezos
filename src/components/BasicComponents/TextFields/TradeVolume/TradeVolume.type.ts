import { BigNumber } from 'bignumber.js';

import { TokenDto } from '@@store/token/tokenPersistStore.type';

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
  setParentValid?: (valid: boolean) => void;
  handleTokenSelect?: () => void;
  editable?: boolean;
  outterChain?: boolean;
  disableDelete?: boolean;
}
