import { TokenDto } from '@@generated/generated-scheme-clutch';

export interface ITokenListItemProps {
  ticker: string;
  balance: number;
  valuatedPrice: number;
  logoURI: string;
  tokenDto: TokenDto;
}
