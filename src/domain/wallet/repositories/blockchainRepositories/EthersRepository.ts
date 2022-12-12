import { formatFixed } from '@ethersproject/bignumber';
import { ethers } from 'ethers';
import { inject, injectable } from 'tsyringe';

import { EvmJsonRpcProviderHolder } from '@@domain/blockchain/EvmJsonRpcProviderHolder';
import { loadingFunction } from '@@utils/loadingHelper';

import * as Type from './WalletBlockChaiRepository.type';

@injectable()
export class EthersRepository implements Type.IBlockChainRepository {
  constructor(@inject('EvmJsonRpcProviderHolder') private evmJsonRpcProviderHolder: EvmJsonRpcProviderHolder) {}

  getBalance = loadingFunction<string>(async ({ selectedWalletAddress, rpcUrl, decimals = 18 }: Type.IGetCoinBalance) => {
    try {
      const provider = this.evmJsonRpcProviderHolder.getProvider(rpcUrl);
      const bigNumBalance = await provider.getBalance(selectedWalletAddress);
      const balance = formatFixed(bigNumBalance, decimals);
      return balance;
    } catch (e) {
      throw new Error(`Error:  ${e}`);
    }
  });

  getContractBalance = loadingFunction<string>(async ({ contractAddress, abi, address, rpcUrl, decimals = 18 }: Type.IGetTokenBalance) => {
    try {
      if (!abi) throw new Error('abi is required');
      const provider = this.evmJsonRpcProviderHolder.getProvider(rpcUrl);
      const contract = new ethers.Contract(contractAddress, abi, provider);
      const bigNumBalance = await contract.balanceOf(address);
      const balance = formatFixed(bigNumBalance, decimals);
      return balance;
    } catch (e) {
      throw new Error(`Error:  ${e}`);
    }
  });
}
