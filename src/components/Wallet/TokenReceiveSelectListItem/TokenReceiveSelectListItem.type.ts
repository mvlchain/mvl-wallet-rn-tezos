import { TokenDto } from '@@generated/generated-scheme-clutch';

export interface ITokenReceiveSelectListItemProps {
  tokenItem: TokenDto;
  amount?: string;
  onPress: (_: string) => void;
}
