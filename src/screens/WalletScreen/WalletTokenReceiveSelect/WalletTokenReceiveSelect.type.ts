import { ListRenderItemInfo } from '@shopify/flash-list';

import { TokenDto } from '@@generated/generated-scheme-clutch';

export interface ITokenReceiveListItem {
  title: string;
  logoURI: string;
}

export interface IRenderItem {
  data: ListRenderItemInfo<TokenDto>;
  onPress: (_: TokenDto) => void;
}

export interface IRenderHistoryItem {
  data: ListRenderItemInfo<IHistory>;
  onPress: (amount: string, token: TokenDto) => void;
}

export interface IHistory {
  token: TokenDto;
  amount: string;
}
