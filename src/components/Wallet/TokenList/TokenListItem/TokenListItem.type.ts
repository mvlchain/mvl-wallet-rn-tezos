import { TokenDto } from '@@store/token/tokenPersistStore.type';

export interface ITokenListItemProps {
  ticker: string;
  balance: number;
  valuatedPrice: number;
  logoURI?: string;
  tokenDto: TokenDto;
}
