export interface JsonRpcProviderHolder<ProviderType> {
  getProvider(rpcUrl: string): ProviderType | undefined;
}
