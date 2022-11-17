import { ethers } from 'ethers';
import { formatEther } from 'ethers/lib/utils';

import { IGetContractBalance } from './WalletBlockChaiRepository.type';

export interface ContractRepository {
  getBalance: () => Promise<string>;
  getContractBalance: ({ contractAddress, abi, address }: IGetContractBalance) => Promise<string>;
}

export class EvmNetworkInfo {
  constructor(readonly rpcUrl: string, readonly chainId: number) {}
}

export class TezosNetworkInfo {
  constructor(readonly rpcUrl: string) {}
}

export class EthersContractImpl implements ContractRepository {
  constructor(private readonly selectedNetworkInfo: EvmNetworkInfo, private readonly selectedWalletPrivateKey: string) {}

  getBalance = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(this.selectedNetworkInfo.rpcUrl);
      const wallet = new ethers.Wallet(this.selectedWalletPrivateKey, provider);
      const bigNumBalance = await wallet.getBalance();
      const balance = formatEther(bigNumBalance);
      return balance;
    } catch (e) {
      throw new Error(`Error:  ${e}`);
    }
  };

  getContractBalance = async ({ contractAddress, abi, address }: IGetContractBalance) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(this.selectedNetworkInfo.rpcUrl);
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
  constructor(private readonly selectedNetworkInfo: TezosNetworkInfo, private readonly selectedWalletPrivateKey: string) {}

  getBalance = async () => {
    try {
      return '0';
    } catch (e) {
      throw new Error(`Error:  ${e}`);
    }
  };

  getContractBalance = async ({ contractAddress, abi, address }: IGetContractBalance) => {
    try {
      return '0';
    } catch (e) {
      throw new Error(`Error:  ${e}`);
    }
  };
}
