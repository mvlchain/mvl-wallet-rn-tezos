import { TokenDto } from '@@store/token/tokenPersistStore.type';

export interface ITokenReceiveSelectListItemProps {
  tokenItem: TokenDto;
  amount?: string;
  onPress: (_: string) => void;
}
