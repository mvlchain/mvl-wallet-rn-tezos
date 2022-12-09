import { formatFixed } from '@ethersproject/bignumber';
import { ethers } from 'ethers';
import { injectable } from 'tsyringe';

import { loadingFunction } from '@@utils/loadingHelper';

import * as Type from './WalletBlockChaiRepository.type';

@injectable()
export class EthersRepository implements Type.IBlockChainRepository {
  constructor() {}
  getBalance = loadingFunction<string>(async ({ selectedWalletPrivateKey, rpcUrl, decimals = 18 }: Type.IGetCoinBalance) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
      const wallet = new ethers.Wallet(selectedWalletPrivateKey, provider);
      const bigNumBalance = await wallet.getBalance();
      const balance = formatFixed(bigNumBalance, decimals);
      return balance;
    } catch (e) {
      throw new Error(`Error:  ${e}`);
    }
  });

  getContractBalance = loadingFunction<string>(async ({ contractAddress, abi, address, rpcUrl, decimals = 18 }: Type.IGetTokenBalance) => {
    try {
      if (!abi) throw new Error('abi is required');
      const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
      const contract = new ethers.Contract(contractAddress, abi, provider);
      const bigNumBalance = await contract.balanceOf(address);
      const balance = formatFixed(bigNumBalance, decimals);
      return balance;
    } catch (e) {
      throw new Error(`Error:  ${e}`);
    }
  });
}
