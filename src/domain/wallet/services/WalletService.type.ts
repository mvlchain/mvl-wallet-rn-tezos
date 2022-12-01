import { Network } from '@@constants/network.constant';

export interface IGetWalletInfoParam {
  index: number;
  bip44: number;
}

export interface ICreateWalletBody extends IGetWalletInfoParam {
  network: Network;
}

export interface IGetWalletPKeyParam extends IGetWalletInfoParam {}

export type TCreateWallet = 'ETHEREUM' | 'BSC' | 'BITCOIN' | 'XTZ';
