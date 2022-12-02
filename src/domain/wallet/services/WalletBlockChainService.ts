import { inject, injectable } from 'tsyringe';

import { abiERC20 } from '@@constants/contract/abi/abiERC20';
import { getNetworkConfig, getNetworkName, Network } from '@@constants/network.constant';
import { TokenDto } from '@@generated/generated-scheme-clutch';

import { ContractRepository } from '../repositories/WalletBlockChainRepository';

import { IBalance } from './WalletBlockChainService.type';
import { WalletService } from './WalletService';

export interface ContractService {
  getBalanceFromNetwork: (index: number, network: Network, tokenList: TokenDto[]) => Promise<any>;
}

@injectable()
export class EthersContractServiceImpl implements ContractService {
  constructor(
    @inject('EthersContractRepository') private ethersContractRepository: ContractRepository,
    @inject('WalletService') private walletService: WalletService
  ) {}

  getBalanceFromNetwork = async (index: number, network: Network, tokenList: TokenDto[]) => {
    const { bip44, rpcUrl } = getNetworkConfig(getNetworkName(false, network));
    let balanceList: IBalance = {};
    const wallet = await this.walletService.getWalletInfo({ index, bip44 });

    const getBalancePromise = tokenList.map(async (token) => {
      let balance;
      if (token.contractAddress === null) {
        balance = await this.ethersContractRepository.getBalance({
          selectedWalletPrivateKey: wallet.privateKey,
          rpcUrl: rpcUrl,
        });
      } else {
        balance = await this.ethersContractRepository.getContractBalance({
          contractAddress: token.contractAddress,
          rpcUrl: rpcUrl,
          abi: abiERC20,
          address: wallet.address,
        });
      }
      balanceList = {
        ...balanceList,
        [token.symbol]: balance,
      };
    });
    await Promise.all(getBalancePromise);
    return balanceList;
  };
}
