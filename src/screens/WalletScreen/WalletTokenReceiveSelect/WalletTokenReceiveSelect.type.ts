import { ListRenderItemInfo } from '@shopify/flash-list';

export interface ITokenReceiveListItem {
  title: string;
  logoURI: string;
}

export interface IRenderItem {
  data: ListRenderItemInfo<ITokenReceiveListItem>;
  onPress: (_: string) => void;
}
