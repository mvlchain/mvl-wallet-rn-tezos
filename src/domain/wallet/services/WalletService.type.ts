import { BlockChain } from '@@domain/blockchain/BlockChain';

export interface IGetWalletInfoParam {
  pKey: string;
  index: number;
  blockchain: BlockChain;
}

export interface ICreateWalletBody extends IGetWalletInfoParam {}

export interface IGetWalletPKeyParam extends IGetWalletInfoParam {}
