import { ethers } from 'ethers';
import { formatEther } from 'ethers/lib/utils';
import { injectable } from 'tsyringe';

import { IGetCoinBalance, IGetTokenBalance } from './WalletBlockChaiRepository.type';

export interface ContractRepository {
  getBalance: ({ selectedWalletPrivateKey, rpcUrl }: IGetCoinBalance) => Promise<string>;
  getContractBalance: ({ contractAddress, abi, address }: IGetTokenBalance) => Promise<string>;
}

@injectable()
export class EthersContractImpl implements ContractRepository {
  getBalance = async ({ selectedWalletPrivateKey, rpcUrl }: IGetCoinBalance) => {
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

  getContractBalance = async ({ contractAddress, abi, address, rpcUrl }: IGetTokenBalance) => {
    try {
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

export class TezosTaquitoContractsImpl implements ContractRepository {
  getBalance = async ({ selectedWalletPrivateKey, rpcUrl }: IGetCoinBalance) => {
    try {
      return '0';
    } catch (e) {
      throw new Error(`Error:  ${e}`);
    }
  };

  getContractBalance = async ({ contractAddress, abi, address }: IGetTokenBalance) => {
    try {
      return '0';
    } catch (e) {
      throw new Error(`Error:  ${e}`);
    }
  };
}
