import { TokenDto } from '@@generated/generated-scheme-clutch';

export interface IQRcode {
  //TODO: 타입설정
  token?: TokenDto;
  address: string;
  amount?: string;
}
