export const TestData = {
  ethAddress: '0xC2981a878baA621E22799C31265aeaAFB7f74c50',
  bscAddress: '0xC2981a878baA621E22799C31265aeaAFB7f74c50',
  selectedWalletPrivateKey: '0xf7a6969b7e1c36b5b86c9be0865acc4b9348f4342e0227a4e95ef435fe5cc0ca',
};

export const ETH_TOKENLIST = [
  {
    contractAddress: null,
    decimals: 18,
    logoURI: 'https://mvl-nft-user-service.s3.ap-northeast-2.amazonaws.com/assets/eth.svg',
    name: 'Ethereum Token',
    priceId: 'ethereum',
    symbol: 'ETH',
  },
  {
    contractAddress: '0x1edfcCe833bac99C278E2886210DbD9213bd139a',
    decimals: 18,
    logoURI: 'https://mvl-nft-user-service.s3.ap-northeast-2.amazonaws.com/assets/mvl.svg',
    name: 'MVL',
    priceId: 'mass-vehicle-ledger',
    symbol: 'MVL',
  },
];

export const BSC_TOKENLIST = [
  {
    contractAddress: null,
    decimals: 18,
    logoURI: 'https://exchange.biswap.org/images/coins/bnb.svg',
    name: 'BNB',
    priceId: 'binancecoin',
    symbol: 'BNB',
  },
  {
    contractAddress: '0x99C1A2D93ae7a7D288F5F372923672A2b5dBae8C',
    decimals: 18,
    logoURI: 'https://mvl-nft-user-service.s3.ap-northeast-2.amazonaws.com/assets/mvl.svg',
    name: 'Binance Wrapped MVL',
    priceId: 'mass-vehicle-ledger',
    symbol: 'bMVL',
  },
  {
    contractAddress: '0xDBe3cC001fcBCc015137F439f0DdC07a82F911e9',
    decimals: 18,
    logoURI: 'https://mvl-nft-user-service.s3.ap-northeast-2.amazonaws.com/assets/btcb.svg',
    name: 'Binance-Peg BTCB',
    priceId: 'binance-bitcoin',
    symbol: 'BTCB',
  },
];
