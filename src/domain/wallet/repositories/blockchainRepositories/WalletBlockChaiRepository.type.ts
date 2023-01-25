import { IBalance } from '@@domain/wallet/services/WalletBlockChainService.type';

export interface IBlockChainRepository {
  getBalance: ({ selectedWalletAddress, rpcUrl }: IGetCoinBalance) => Promise<string>;
  getContractBalance: ({ contractAddress, abi, address }: IGetTokenBalance) => Promise<string>;
  getBalanceByMulticall?: ({ calls, config }: IBalanceMultical) => Promise<IBalance>;
  getTokenMetadata: (rpcUrl: string, contractAddress: string, abi?: string) => Promise<IMetadata>;
}

export interface IBalanceMultical {
  calls: ICallBody[];
  config: IConfigBody;
}

export interface IConfigBody {
  rpcUrl: string;
  multicallAddress: string;
}

export interface ICallBody {
  target?: string;
  call: string[];
  returns: (string | ((val: any) => number))[][];
}

export interface IGetCoinBalance {
  selectedWalletAddress: string;
  rpcUrl: string;
  decimals?: number;
}

export interface IGetTokenBalance {
  contractAddress: string;
  abi?: string;
  standardType?: string;
  address: string;
  rpcUrl: string;
  decimals?: number;
}

export interface IMetadata {
  name?: string;
  symbol?: string;
  decimals?: string;
}
