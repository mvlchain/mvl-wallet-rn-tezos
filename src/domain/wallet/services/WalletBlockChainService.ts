import { inject, injectable } from 'tsyringe';

import { abiERC20 } from '@@constants/contract/abi/abiERC20';
import { getNetworkConfig, getNetworkName, Network, NETWORK_ID } from '@@constants/network.constant';
import { IBlockChainRepository } from '@@domain/wallet/repositories/blockchainRepositories/WalletBlockChaiRepository.type';
import { TokenDto } from '@@generated/generated-scheme-clutch';

import { IBalance } from './WalletBlockChainService.type';
import { WalletService } from './WalletService';

export interface IWalletBlockChainService {
  getBalanceFromNetwork: (index: number, network: Network, tokenList: TokenDto[]) => Promise<any>;
  setBlockChainRepository(network: Network): IBlockChainRepository;
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
    const { rpcUrl } = getNetworkConfig(getNetworkName(false, network));
    let balanceList: IBalance = {};
    const wallet = await this.walletService.getWalletInfo({ index, network });
    const blockchainRepository = this.setBlockChainRepository(network);
    const getBalancePromise = tokenList.map(async (token) => {
      let balance;
      if (token.contractAddress === null) {
        balance = await blockchainRepository.getBalance({
          selectedWalletPrivateKey: wallet.privateKey,
          rpcUrl: rpcUrl,
        });
      } else {
        balance = await blockchainRepository.getContractBalance({
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
