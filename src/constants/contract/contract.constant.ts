import { WALLET_TOKEN } from '@@constants/token.constant';
import { CryptoType, IBep20Token, IErc20Token } from '@@types/ContractType';

// erc20
export const ETHEREUM: IErc20Token = {
  contractAddress: '',
  tokenName: 'Ethereum',
  symbol: 'ETH',
  decimal: 18,
  gasLimit: 21000,
  cryptoType: CryptoType.COIN,
};

export const MVL_GOERLI: IErc20Token = {
  contractAddress: '0x1edfcCe833bac99C278E2886210DbD9213bd139a',
  tokenName: 'Mass Vehicle Ledger Token',
  symbol: 'MVL',
  decimal: 18,
  gasLimit: 10000,
  cryptoType: CryptoType.TOKEN,
};

export const MVL: IErc20Token = {
  contractAddress: '0xa849eaae994fb86afa73382e9bd88c2b6b18dc71',
  tokenName: 'Mass Vehicle Ledger Token',
  symbol: 'MVL',
  decimal: 18,
  gasLimit: 10000,
  cryptoType: CryptoType.TOKEN,
};

// bep20
export const BNB: IBep20Token = {
  contractAddress: '',
  tokenName: 'Binance',
  symbol: 'BNB',
  decimal: 18,
  gasLimit: 21000,
  cryptoType: CryptoType.COIN,
};

export const B_MVL_STAGE: IBep20Token = {
  contractAddress: '0x99C1A2D93ae7a7D288F5F372923672A2b5dBae8C',
  tokenName: 'Binance Wrapped MVL',
  symbol: 'bMVL',
  decimal: 18,
  gasLimit: 70000,
  cryptoType: CryptoType.TOKEN,
};

export const B_MVL: IBep20Token = {
  contractAddress: '0x5f588EfAf8eB57e3837486e834fC5a4E07768D98',
  tokenName: 'Binance Wrapped MVL',
  symbol: 'bMVL',
  decimal: 18,
  gasLimit: 70000,
  cryptoType: CryptoType.TOKEN,
};

export const BTCB_STAGE: IBep20Token = {
  contractAddress: '0xDBe3cC001fcBCc015137F439f0DdC07a82F911e9',
  tokenName: 'Binance wrapped Bitcoin',
  symbol: 'BTCB',
  decimal: 18,
  gasLimit: 70000,
  cryptoType: CryptoType.TOKEN,
};

export const BTCB: IBep20Token = {
  contractAddress: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
  tokenName: 'Binance wrapped Bitcoin',
  symbol: 'BTCB',
  decimal: 18,
  gasLimit: 70000,
  cryptoType: CryptoType.TOKEN,
};

export const getToken = (isMainnet: boolean, ticker: keyof typeof WALLET_TOKEN): IErc20Token | IBep20Token => {
  if (isMainnet) {
    switch (ticker) {
      case WALLET_TOKEN.ETH:
        return ETHEREUM;
      case WALLET_TOKEN.MVL:
        return MVL;
      case WALLET_TOKEN.BNB:
        return BNB;
      case WALLET_TOKEN.bMVL:
        return B_MVL;
      case WALLET_TOKEN.BTCB:
        return BTCB;
      default:
        return ETHEREUM;
    }
  } else {
    switch (ticker) {
      case WALLET_TOKEN.ETH:
        return ETHEREUM;
      case WALLET_TOKEN.MVL:
        return MVL_GOERLI;
      case WALLET_TOKEN.BNB:
        return B_MVL_STAGE;
      case WALLET_TOKEN.bMVL:
        return B_MVL_STAGE;
      case WALLET_TOKEN.BTCB:
        return BTCB_STAGE;
      default:
        return ETHEREUM;
    }
  }
};
