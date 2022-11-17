import { BlockChain } from '@@domain/blockchain/BlockChain';

export interface ICreateWalletBody {
  pKey: string;
  index: number;
  blockchain: BlockChain;
}
