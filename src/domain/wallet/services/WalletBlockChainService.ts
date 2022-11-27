import { IS_PRODUCT, ETH_RPC_URL, BSC_RPC_URL } from 'react-native-dotenv';
import { inject, injectable } from 'tsyringe';

import { abiERC20 } from '@@constants/contract/abi/abiERC20';
import { getToken } from '@@constants/contract/contract.constant';
import { Network } from '@@constants/network.constant';
import { BASIC_ETH_TOKEN, BASIC_BSC_TOKEN, WALLET_TOKEN } from '@@constants/token.constant';
import { BlockChainList } from '@@domain/blockchain/BlockChain';
import { CryptoType } from '@@types/ContractType';

import { ContractRepository } from '../repositories/WalletBlockChainRepository';

import { IBalance } from './WalletBlockChainService.type';
import { WalletService } from './WalletService';

export interface ContractService {
  getBalanceFromNetwork: (index: number, network: Network) => Promise<any>;
}

@injectable()
export class EthersContractServiceImpl implements ContractService {
  constructor(
    @inject('EthersContractRepository') private ethersContractRepository: ContractRepository,
    @inject('WalletService') private walletService: WalletService
  ) {}

  // TODO: 중요! 타입 형변환이 너무 무식하게 들어감 위험해보임.
  // 타입 캐스팅이 너무 많습니다. 해결방안이 있다면 수정해야할 것 같습니다.
  getBalanceFromNetwork = async (index: number, network: Network) => {
    const { blockchain, rpcUrl, tokenList } = this._getSetting(network);
    const keyOfCrypto = Object.keys(tokenList);
    let balanceList: IBalance = {};
    const wallet = await this.walletService.getWalletInfo({ index, blockchain });
    const getBalancePromise = keyOfCrypto.map(async (crypto) => {
      let balance;
      const value = getToken(IS_PRODUCT === 'TRUE', crypto);
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
