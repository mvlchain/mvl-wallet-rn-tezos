import { ethers } from 'ethers';
import { formatEther } from 'ethers/lib/utils';
import { injectable } from 'tsyringe';

import * as Type from './WalletBlockChaiRepository.type';

@injectable()
export class EthersRepository implements Type.IBlockChainRepository {
  constructor() {}
  getBalance = async ({ selectedWalletPrivateKey, rpcUrl }: Type.IGetCoinBalance) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
      const wallet = new ethers.Wallet(selectedWalletPrivateKey, provider);
      const bigNumBalance = await wallet.getBalance();
      const balance = formatEther(bigNumBalance);
      return balance;
    } catch (e) {
      throw new Error(`Error:  ${e}`);
    }
  };

  getContractBalance = async ({ contractAddress, abi, address, rpcUrl }: Type.IGetTokenBalance) => {
    try {
      if (!abi) throw new Error('abi is required');
      const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
      const contract = new ethers.Contract(contractAddress, abi, provider);
      const bigNumBalance = await contract.balanceOf(address);
      const balance = formatEther(bigNumBalance);
      return balance;
    } catch (e) {
      throw new Error(`Error:  ${e}`);
    }
  };
}
