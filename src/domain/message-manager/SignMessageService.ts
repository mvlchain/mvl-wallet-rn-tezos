import { SignTypedDataVersion, TypedMessageParams } from '@metamask/controllers';
import { signTypedData } from '@metamask/eth-sig-util';
import { addHexPrefix, toBuffer } from 'ethereumjs-util';
import { inject, injectable } from 'tsyringe';

import { Network } from '@@constants/network.constant';
import { WalletService } from '@@domain/wallet/services/WalletService';

@injectable()
export class SignMessageService {
  constructor(@inject('WalletService') private walletService: WalletService) {}
  async signTypedMessage(selectedNetwork: Network, index: number, messageParams: TypedMessageParams, version: SignTypedDataVersion) {
    try {
      const walletInfo = await this.walletService.getWalletInfo({ index, network: selectedNetwork });

      const privateKeyBuffer = toBuffer(addHexPrefix(walletInfo.privateKey));
      switch (version) {
        case SignTypedDataVersion.V1:
          return signTypedData({
            privateKey: privateKeyBuffer,
            data: messageParams.data as any,
            version: SignTypedDataVersion.V1,
          });
        case SignTypedDataVersion.V3:
          return signTypedData({
            privateKey: privateKeyBuffer,
            data: JSON.parse(messageParams.data as string),
            version: SignTypedDataVersion.V3,
          });
        case SignTypedDataVersion.V4:
          return signTypedData({
            privateKey: privateKeyBuffer,
            data: JSON.parse(messageParams.data as string),
            version: SignTypedDataVersion.V4,
          });
        default:
          throw new Error(`Unexpected signTypedMessage version: '${version}'`);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
