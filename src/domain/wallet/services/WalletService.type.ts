import { Network } from '@@constants/network.constant';
export interface IGetWalletInfoParam {
  index: number;
  network: Network;
}

export interface ICreateWalletBody extends IGetWalletInfoParam {}

export interface IGetWalletPKeyParam extends IGetWalletInfoParam {}
