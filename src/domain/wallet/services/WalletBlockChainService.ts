import { inject, injectable } from 'tsyringe';

import { abiERC20 } from '@@constants/contract/abi/abiERC20';
import { getNetworkConfig, getNetworkByBase, Network, NETWORK_ID } from '@@constants/network.constant';
import { IBlockChainRepository } from '@@domain/wallet/repositories/blockchainRepositories/WalletBlockChaiRepository.type';
import { TokenDto } from '@@store/token/tokenPersistStore.type';

import { IBalance } from './WalletBlockChainService.type';
import { WalletService } from './WalletService';

export interface IWalletBlockChainService {
  getBalanceFromNetwork: (index: number, network: Network, tokenList: TokenDto[]) => Promise<any>;
  setBlockChainRepository(network: Network): IBlockChainRepository;
  getOneBalanceFromNetwork: (index: number, network: Network, token: TokenDto) => Promise<string>;
}

@injectable()
export class WalletBlockChainService implements IWalletBlockChainService {
  constructor(
    @inject('EthersRepository') private ethersRepository: IBlockChainRepository,
    @inject('TezosRepository') private tezosRepository: IBlockChainRepository,
    @inject('WalletService') private walletService: WalletService
  ) {}

  setBlockChainRepository = (network: Network): IBlockChainRepository => {
    const networkId = getNetworkConfig(network).networkId;
    switch (networkId) {
      case NETWORK_ID.ETHEREUM:
      case NETWORK_ID.BSC:
        return this.ethersRepository;
      case NETWORK_ID.XTZ:
        return this.tezosRepository;
    }
  };

  getBalanceFromNetwork = async (index: number, network: Network, tokenList: TokenDto[]) => {
    const { rpcUrl } = getNetworkConfig(getNetworkByBase(network));
    let balanceList: IBalance = {};
    const wallet = await this.walletService.getWalletInfo({ index, network });
    const blockchainRepository = this.setBlockChainRepository(network);
    const getBalancePromise = tokenList.map(async (token) => {
      let balance;
      if (token.contractAddress === null) {
        balance = await blockchainRepository.getBalance({
          selectedWalletAddress: wallet.address,
          rpcUrl: rpcUrl,
          decimals: token.decimals,
        });
      } else {
        // TODO: tezos token일 시 standardType 추가해야함
        balance = await blockchainRepository.getContractBalance({
          contractAddress: token.contractAddress,
          rpcUrl: rpcUrl,
          abi: abiERC20,
          address: wallet.address,
          decimals: token.decimals,
          // standardType: token.standardType, // undefined or string?
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

  getOneBalanceFromNetwork = async (index: number, network: Network, token: TokenDto) => {
    const { rpcUrl } = getNetworkConfig(getNetworkByBase(network));
    const wallet = await this.walletService.getWalletInfo({ index, network });
    const blockchainRepository = this.setBlockChainRepository(network);
    let balance;
    if (token.contractAddress === null) {
      balance = await blockchainRepository.getBalance({
        selectedWalletAddress: wallet.address,
        rpcUrl: rpcUrl,
        decimals: token.decimals,
      });
    } else {
      // TODO: tezos token일 시 standardType 추가해야함
      balance = await blockchainRepository.getContractBalance({
        contractAddress: token.contractAddress,
        rpcUrl: rpcUrl,
        abi: abiERC20,
        address: wallet.address,
        decimals: token.decimals,
        // standardType: token.standardType, // undefined or string?
      });
    }
    return balance;
  };
}
