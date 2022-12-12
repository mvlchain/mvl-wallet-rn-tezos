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
