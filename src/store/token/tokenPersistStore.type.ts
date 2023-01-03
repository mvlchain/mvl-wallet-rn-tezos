import { Network } from '@@constants/network.constant';

export interface ITokenPersist extends ITokenPersistState {
  setToken: (network: Network, tokenDto: TokenDTO) => void;
}

export interface ITokenPersistState {
  tokenList: {
    [network: string]: TokenDTO[];
  };
}

export interface TokenDTO {
  symbol: string;
  name: string;
  decimals: number;
  contractAddress: string | null;
  logoURI?: string;
  priceId?: string;
}
