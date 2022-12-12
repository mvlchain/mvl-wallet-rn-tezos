import { ITokenReceiveListItem } from '@@screens/WalletScreen/WalletTokenReceiveSelect/WalletTokenReceiveSelect.type';

export interface ITokenReceiveSelectListItemProps {
  tokenItem: ITokenReceiveListItem;
  onPress: (_: string) => void;
}
