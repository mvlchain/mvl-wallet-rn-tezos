import { testnetBTCBAbi } from '@@constants/contract/abi/testNet/testnetBTCBAbi';
import { testnetMvlAbi } from '@@constants/contract/abi/testNet/testnetMvlAbi';
import { testnetbMvlAbi } from '@@constants/contract/abi/testNet/testnetbMvlAbi';
import { WALLET_TOKEN } from '@@constants/token.constant';

export const getAbi = (isMainnet: boolean, ticker: keyof typeof WALLET_TOKEN) => {
  let abi;
  if (isMainnet) {
    // TODO: mainnet abi import
    switch (ticker) {
      case WALLET_TOKEN.MVL:
        abi = testnetMvlAbi;
        break;
      case WALLET_TOKEN.bMVL:
        abi = testnetbMvlAbi;
        break;
      case WALLET_TOKEN.BTCB:
        abi = testnetBTCBAbi;
        break;

      default:
        abi = testnetMvlAbi;
        break;
    }
  } else {
    switch (ticker) {
      case WALLET_TOKEN.MVL:
        abi = testnetMvlAbi;
        break;

      case WALLET_TOKEN.bMVL:
        abi = testnetbMvlAbi;
        break;

      case WALLET_TOKEN.BTCB:
        abi = testnetBTCBAbi;
        break;

      default:
        abi = testnetMvlAbi;
        break;
    }
  }
  return JSON.stringify(abi);
};
