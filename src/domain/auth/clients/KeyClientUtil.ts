import ShareStore from '@tkey/common-types/src/base/ShareStore';
import BN from 'bn.js';
import { ethers } from 'ethers';
export interface KeyClientUtil {
  shareToShareJson: (shareStore: ShareStore) => string;
  pkeyToMnemonic: (pkey: BN) => string;
}

export class KeyClientUtilImpl implements KeyClientUtil {
  shareToShareJson(shareStore: ShareStore) {
    return JSON.stringify({
      share: {
        share: shareStore.share.share.toString('hex', 64),
        shareIndex: shareStore.share.shareIndex.toString('hex', 64),
      },
      // polynomialID 에서 ID 대문자인것 조심
      polynomialID: shareStore.polynomialID,
    });
  }
  pkeyToMnemonic = (pkey: BN): string => ethers.utils.entropyToMnemonic('0x' + pkey.toString('hex', 64));
}
