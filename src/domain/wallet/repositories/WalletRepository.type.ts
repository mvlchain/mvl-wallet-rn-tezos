import { CURRENCY } from '@@constants/setting.constant';

export interface IGetPriceDto {
  ids: string;
  vsCurrencies: keyof typeof CURRENCY;
  include_market_cap?: boolean;
  include_24hr_vol?: boolean;
  include_24hr_change?: boolean;
  include_last_updated_at?: boolean;
}

export interface IGetPriceResponseDto {
  [key: string]: unknown;
}
