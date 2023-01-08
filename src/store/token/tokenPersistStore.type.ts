import { Network } from '@@constants/network.constant';

export interface ITokenPersist extends ITokenPersistState {
  // TODO: addPriceId, addLogoURI
  setToken: (network: Network, tokenDto: TokenDto) => void;
}

export interface ITokenPersistState {
  tokenList: {
    [network: string]: TokenDto[];
  };
}

export interface TokenDto {
  symbol: string;
  name: string;
  decimals: number;
  address: string;
  contractAddress: string | null;
  logoURI?: string;
  priceId?: string;
}
