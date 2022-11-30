export interface IGetCoinBalance {
  selectedWalletPrivateKey: string;
  rpcUrl: string;
}

export interface IGetTokenBalance {
  contractAddress: string;
  abi: string;
  address: string;
  rpcUrl: string;
}
