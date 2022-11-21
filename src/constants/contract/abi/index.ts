import { testNetBTCBAbi } from '@@constants/contract/abi/testNet/testNetBTCBAbi';
import { testNetMvlAbi } from '@@constants/contract/abi/testNet/testNetMvlAbi';
import { testNetbMvlAbi } from '@@constants/contract/abi/testNet/testNetbMvlAbi';
import { WALLET_TOKEN } from '@@constants/token.constant';

export const getAbi = (isMainnet: boolean, ticker: keyof typeof WALLET_TOKEN) => {
  let abi;
  if (isMainnet) {
    // TODO: mainnet abi import
    switch (ticker) {
      case WALLET_TOKEN.MVL:
        abi = testNetMvlAbi;
        break;
      case WALLET_TOKEN.bMVL:
        abi = testNetbMvlAbi;
        break;
      case WALLET_TOKEN.BTCB:
        abi = testNetBTCBAbi;
        break;

      default:
        abi = testNetMvlAbi;
        break;
    }
  } else {
    switch (ticker) {
      case WALLET_TOKEN.MVL:
        abi = testNetMvlAbi;
        break;

      case WALLET_TOKEN.bMVL:
        abi = testNetbMvlAbi;
        break;

      case WALLET_TOKEN.BTCB:
        abi = testNetBTCBAbi;
        break;

      default:
        abi = testNetMvlAbi;
        break;
    }
  }
  return JSON.stringify(abi);
};
