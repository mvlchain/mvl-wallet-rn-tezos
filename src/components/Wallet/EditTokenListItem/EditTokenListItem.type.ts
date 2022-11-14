import { WALLET_TOKEN } from '@@constants/token.constant';

export interface IEditTokenListItemProps {
  tokenName: keyof typeof WALLET_TOKEN;
}
