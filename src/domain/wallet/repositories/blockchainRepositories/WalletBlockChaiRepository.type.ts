export interface IBlockChainRepository {
  getBalance: ({ selectedWalletAddress, rpcUrl }: IGetCoinBalance) => Promise<string>;
  getContractBalance: ({ contractAddress, abi, address }: IGetTokenBalance) => Promise<string>;
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
