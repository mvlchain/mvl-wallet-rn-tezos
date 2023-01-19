import BigNumber from 'bignumber.js';
import { BytesLike } from 'ethers';

import { IGasFeeInfo } from '@@domain/gas/Gas.type';
import { TokenDto } from '@@store/token/tokenPersistStore.type';

export type TGasConfirmButtonFunctionParam = {
  to: string;
  value?: BigNumber | null;
  data?: BytesLike | null;
  gasFeeInfo: IGasFeeInfo;
};
