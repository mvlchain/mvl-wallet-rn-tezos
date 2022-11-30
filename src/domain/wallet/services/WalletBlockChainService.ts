import { inject, injectable } from 'tsyringe';

import { abiERC20 } from '@@constants/contract/abi/abiERC20';
import { getToken } from '@@constants/contract/contract.constant';
import { Network } from '@@constants/network.constant';
import { BASIC_ETH_TOKEN, BASIC_BSC_TOKEN } from '@@constants/token.constant';
import { BlockChainList } from '@@domain/blockchain/BlockChain';
import { CryptoType } from '@@types/ContractType';

import { ContractRepository } from '../repositories/WalletBlockChainRepository';

import { IBalance } from './WalletBlockChainService.type';
import { WalletService } from './WalletService';

export interface ContractService {
  getBalanceFromNetwork: (index: number, network: Network) => Promise<any>;
}

const ETH_RPC_URL = 'https://goerli.infura.io/v3/***REMOVED***';
const BSC_RPC_URL = 'https://data-seed-prebsc-1-s1.binance.org:8545';

@injectable()
export class EthersContractServiceImpl implements ContractService {
  constructor(
    @inject('EthersContractRepository') private ethersContractRepository: ContractRepository,
    @inject('WalletService') private walletService: WalletService
  ) {}

  getBalanceFromNetwork = async (index: number, network: Network) => {
    const { blockchain, rpcUrl, tokenList } = this._getSetting(network);
    const keyOfCrypto = Object.keys(tokenList);
    let balanceList: IBalance = {};
    const wallet = await this.walletService.getWalletInfo({ index, blockchain });
    const getBalancePromise = keyOfCrypto.map(async (crypto) => {
      let balance;
      const value = getToken(false, crypto);
      if (value.cryptoType === CryptoType.COIN) {
        balance = await this.ethersContractRepository.getBalance({
          selectedWalletPrivateKey: wallet.privateKey,
          rpcUrl: rpcUrl,
        });
      } else {
        balance = await this.ethersContractRepository.getContractBalance({
          contractAddress: value.contractAddress,
          rpcUrl: rpcUrl,
          abi: abiERC20,
          address: wallet.address,
        });
      }
      balanceList = {
        ...balanceList,
        [value.symbol]: balance,
      };
    });
    await Promise.all(getBalancePromise);
    return balanceList;
  };

  // TODO: env로 설정
  _getSetting = (network: Network) => {
    const ethSetting = {
      tokenList: BASIC_ETH_TOKEN,
      blockchain: BlockChainList.ETHEREUM,
      rpcUrl: ETH_RPC_URL,
    };
    const bscSetting = {
      tokenList: BASIC_BSC_TOKEN,
      blockchain: BlockChainList.BSC,
      rpcUrl: BSC_RPC_URL,
    };
    return network === 'ETHEREUM' ? ethSetting : bscSetting;
  };
}
