import { Network } from '@@constants/network.constant';

import { IWalletClient } from '../clients/WalletClient.type';

export interface IServiceWalletClient {
  [key: string]: IWalletClient;
}

export interface IGetWalletInfoParam {
  index: number;
  network: Network;
}

export interface ICreateWalletBody extends IGetWalletInfoParam {}

export interface IGetWalletPKeyParam extends IGetWalletInfoParam {}
