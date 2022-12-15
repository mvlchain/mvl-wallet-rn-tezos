import { Network } from '@@constants/network.constant';

import { IClaimWalletListMenuProps } from './ClaimWalletListMenu/ClaimWalletListMenu.type';

export interface IClaimWalletListModalProps {
  menuList: IClaimWalletListMenuProps[];
}

export interface IUseClaimWalletListModalParam {
  network: Network;
}
