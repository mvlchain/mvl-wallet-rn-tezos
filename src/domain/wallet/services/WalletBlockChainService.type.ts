import { QrCodeLinkTransfer } from '@@domain/auth/QrCodeParser/QrCodeParser.type';
import { TokenDto } from '@@store/token/tokenPersistStore.type';
//
export interface IBalance {
  [key: string]: string;
}

export interface IBalanceData {
  ticker: string;
  balance: number;
  valuatedPrice: number;
  logoURI: string | undefined;
  tokenDto: TokenDto;
}

export type TQrCodeLink = {
  qrCodeContents: QrCodeLinkTransfer;
  token: TokenDto;
};
