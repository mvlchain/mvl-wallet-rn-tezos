import { inject, injectable } from 'tsyringe';

import appconfig from '@@config/appconfig';
import { abiERC20 } from '@@constants/contract/abi/abiERC20';
import { getNetworkConfig, getNetworkByBase, Network, NETWORK_ID } from '@@constants/network.constant';
import { ERC20_MULTICALL_METHOD } from '@@constants/token.constant';
import { IBlockChainRepository, ICallBody, IConfigBody } from '@@domain/wallet/repositories/blockchainRepositories/WalletBlockChaiRepository.type';
import { ITokenPersistState, TokenDto } from '@@store/token/tokenPersistStore.type';
import { isBlank, isNotBlank } from '@@utils/strings';

import { IBalance } from './WalletBlockChainService.type';
import { WalletService } from './WalletService';

export interface IWalletBlockChainService {
  getBalanceFromNetwork: (index: number, network: Network, tokenList: TokenDto[]) => Promise<any>;
  setBlockChainRepository(network: Network): IBlockChainRepository;
  getOneBalanceFromNetwork: (index: number, network: Network, token: TokenDto) => Promise<string>;
  getTokenByNetworkContractAddress: (tokenStore: ITokenPersistState, network: Network, contractAddress?: string) => TokenDto | undefined;
}

@injectable()
export class WalletBlockChainService implements IWalletBlockChainService {
  constructor(
    @inject('EthersRepository') private ethersRepository: IBlockChainRepository,
    @inject('TezosRepository') private tezosRepository: IBlockChainRepository,
    @inject('WalletService') private walletService: WalletService
  ) { }

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
    const { rpcUrl, multicallAddress } = getNetworkConfig(getNetworkByBase(network));
    const wallet = await this.walletService.getWalletInfo({ index, network });
    const blockchainRepository = this.setBlockChainRepository(network);
    let balanceList: IBalance = {};

    if (blockchainRepository.getBalanceByMulticall) {
      if (!multicallAddress) return;
      balanceList = await this._multiCall(blockchainRepository, rpcUrl, multicallAddress, tokenList, wallet.address);
    } else {
      balanceList = await this._singleCall(blockchainRepository, rpcUrl, tokenList, wallet.address);
    }

    return balanceList;
  };

  getOneBalanceFromNetwork = async (index: number, network: Network, token: TokenDto) => {
    const { rpcUrl } = getNetworkConfig(getNetworkByBase(network));
    const wallet = await this.walletService.getWalletInfo({ index, network });
    const blockchainRepository = this.setBlockChainRepository(network);
    const balance = await this._getBalance(blockchainRepository, wallet.address, token, rpcUrl);

    return balance;
  };

  _multiCall = async (
    blockchainRepository: IBlockChainRepository,
    rpcUrl: string,
    multicallAddress: string,
    tokenList: TokenDto[],
    walletAddress: string
  ) => {
    if (!blockchainRepository.getBalanceByMulticall) return {};
    const config: IConfigBody = {
      rpcUrl,
      multicallAddress: multicallAddress ?? '',
    };
    let balanceList: IBalance = {};
    const calls: ICallBody[] = [];
    tokenList.map(async (token) => {
      const target = token.contractAddress ?? undefined;
      const type = token.contractAddress === null ? 'COIN' : 'TOKEN';
      calls.push({
        target,
        call: [ERC20_MULTICALL_METHOD[type], walletAddress],
        returns: [[token.symbol, (val: any) => val / 10 ** token.decimals]],
      });
    });
    balanceList = await blockchainRepository.getBalanceByMulticall({ calls, config });
    return balanceList;
  };

  _singleCall = async (blockchainRepository: IBlockChainRepository, rpcUrl: string, tokenList: TokenDto[], walletAddress: string) => {
    let balanceList: IBalance = {};
    const getBalancePromise = tokenList.map(async (token) => {
      const balance = await this._getBalance(blockchainRepository, walletAddress, token, rpcUrl);
      balanceList = {
        ...balanceList,
        [token.symbol]: balance,
      };
    });
    await Promise.all(getBalancePromise);
    return balanceList;
  };

  _getBalance = async (blockchainRepository: IBlockChainRepository, address: string, token: TokenDto, rpcUrl: string) => {
    let balance;
    if (token.contractAddress === null) {
      balance = await blockchainRepository.getBalance({
        selectedWalletAddress: address,
        rpcUrl: rpcUrl,
        decimals: token.decimals,
      });
    } else {
      // TODO: tezos token일 시 standardType 추가해야함
      balance = await blockchainRepository.getContractBalance({
        contractAddress: token.contractAddress,
        rpcUrl: rpcUrl,
        abi: abiERC20,
        address: address,
        decimals: token.decimals,
        // standardType: token.standardType, // undefined or string?
      });
    }
    return balance;
  };

  /**
   * find a token model from local token list.
   * @param network fidn
   * @param contractAddress
   * @returns
   */
  getTokenByNetworkContractAddress = (tokenStore: ITokenPersistState, network: Network, contractAddress?: string): TokenDto | undefined => {
    const { tokenList } = tokenStore;
    const networkByType = this.getNetworkByNetworkType(network);
    return tokenList[networkByType].find(
      (item) => (isBlank(contractAddress) && !item.contractAddress) || (isNotBlank(contractAddress) && item.contractAddress)
    );
  };

  isTestNet = () => appconfig().baseNetwork !== 'mainnet';

  getNetworkByNetworkType = (network: Network): Network => {
    const isTestNet = this.isTestNet();
    if (isTestNet) {
      switch (network) {
        case 'ETHEREUM':
        case 'GOERLI':
          return 'GOERLI';

        case 'BSC':
        case 'BSC_TESTNET':
          return 'BSC_TESTNET';

        case 'TEZOS':
        case 'TEZOS_GHOSTNET':
          return 'TEZOS_GHOSTNET';
      }
    } else {
      switch (network) {
        case 'ETHEREUM':
        case 'GOERLI':
          return 'ETHEREUM';

        case 'BSC':
        case 'BSC_TESTNET':
          return 'BSC';

        case 'TEZOS':
        case 'TEZOS_GHOSTNET':
          return 'TEZOS';
      }
    }
  };
}
