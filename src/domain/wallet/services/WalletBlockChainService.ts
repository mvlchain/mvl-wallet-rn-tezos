// import { IS_PRODUCT } from '@env';

import { inject, injectable } from 'tsyringe';

import { getAbi } from '@@constants/contract/abi';
import { getToken } from '@@constants/contract/contract.constant';
import { Network } from '@@constants/network.constant';
import { BASIC_ETH_TOKEN, BASIC_BSC_TOKEN, WALLET_TOKEN } from '@@constants/token.constant';
import { BlockChainList } from '@@domain/blockchain/BlockChain';
import { CryptoType } from '@@types/ContractType';

import { ContractRepository } from '../repositories/WalletBlockChainRepository';

import { IBalance } from './WalletBlockChainService.type';
import { WalletService } from './WalletService';
// TODO: change to env
const TEST_ETH_RPC_URL = 'https://goerli.infura.io/v3/***REMOVED***';
const TEST_BSC_RPC_URL = 'https://data-seed-prebsc-1-s1.binance.org:8545';

export interface ContractService {
  getBalanceFromNetwork: (index: number, network: Network) => Promise<any>;
}

@injectable()
export class EthersContractServiceImpl implements ContractService {
  constructor(
    @inject('EthersContractRepository') private ethersContractRepository: ContractRepository,
    @inject('WalletService') private walletService: WalletService
  ) {}

  getBalanceFromNetwork = async (index: number, network: Network) => {
    try {
      const { blockchain, rpcUrl, tokenList } = this._getSetting(network);
      const keyOfCrypto = Object.keys(tokenList);
      let balanceList: IBalance = {};
      const wallet = await this.walletService.getWalletInfo({ index, blockchain });
      const getBalancePromise = keyOfCrypto.map(async (crypto) => {
        let balance;
        // TODO: change to env
        const value = getToken(false, crypto as keyof typeof tokenList);
        if (value.cryptoType === CryptoType.COIN) {
          balance = await this.ethersContractRepository.getBalance({
            selectedWalletPrivateKey: wallet.privateKey,
            rpcUrl: rpcUrl,
          });
        } else {
          balance = await this.ethersContractRepository.getContractBalance({
            contractAddress: value.contractAddress,
            rpcUrl: rpcUrl,
            // TODO: change to env
            abi: getAbi(false, value.symbol as keyof typeof WALLET_TOKEN),
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
    } catch (e) {
      console.log(`ERROR:  ${e}`);
    }
  };

  _getSetting = (network: Network) => {
    const ethSetting = {
      tokenList: BASIC_ETH_TOKEN,
      blockchain: BlockChainList.ETHEREUM,
      rpcUrl: TEST_ETH_RPC_URL,
    };
    const bscSetting = {
      tokenList: BASIC_BSC_TOKEN,
      blockchain: BlockChainList.BSC,
      rpcUrl: TEST_BSC_RPC_URL,
    };
    return network === 'ETHEREUM' ? ethSetting : bscSetting;
  };
}
