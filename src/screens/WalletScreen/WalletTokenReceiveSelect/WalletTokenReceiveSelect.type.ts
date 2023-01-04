import { ListRenderItemInfo } from '@shopify/flash-list';

import { TokenDto } from '@@store/token/tokenPersistStore.type';

export interface ITokenReceiveListItem {
  title: string;
  logoURI: string | undefined;
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
  cacheQR: string;
}
