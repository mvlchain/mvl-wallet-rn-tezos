import appconfig from '@@config/appconfig';
import { BSC_TOKENLIST } from '@@domain/wallet/repositories/TestData';
import { ETHEREUM_TOKEN_LIST, TEZOS_TOKEN_LIST } from '@@store/token/tokenPersistStore.constant';
import { TokenDto } from '@@store/token/tokenPersistStore.type';
import { valueOf } from '@@utils/types';

export const NETWORK = {
  ETH: 'ETHEREUM',
  GOERLI: 'GOERLI',
  BSC: 'BSC',
  BSC_TESTNET: 'BSC_TESTNET',
  TEZOS: 'TEZOS',
  TEZOS_GHOSTNET: 'TEZOS_GHOSTNET',
} as const;

export type Network = valueOf<typeof NETWORK>;

export const NETWORK_ID = {
  ETHEREUM: 'ETHEREUM',
  BSC: 'BSC',
  XTZ: 'XTZ',
} as const;

export type NetworkId = valueOf<typeof NETWORK_ID>;

export const NETWORK_FEE_TYPE = {
  EVM_LEGACY_GAS: 'EVM_LEGACY_GAS',
  EIP1559: 'EIP1559',
  TEZOS: 'TEZOS',
} as const;

export type NetworkFeeType = valueOf<typeof NETWORK_FEE_TYPE>;

export type NetworkConfig = {
  name: string;
  shortName: string;
  chainId: number;
  bip44: number;
  rpcUrl: string;
  networkFeeType: NetworkFeeType;
  networkId: NetworkId;
  coin: string;
};

const NETWORK_CONFIGS: Record<Network, NetworkConfig> = {
  [NETWORK.ETH]: {
    name: 'Ethereum Main Network',
    shortName: 'Ethereum',
    chainId: 1,
    bip44: 60,
    rpcUrl: '***REMOVED***',
    networkFeeType: NETWORK_FEE_TYPE.EIP1559,
    networkId: NETWORK_ID.ETHEREUM,
    coin: 'ETH',
  },
  [NETWORK.GOERLI]: {
    name: 'Ethereum Goerli Testnet',
    shortName: 'Goerli Testnet',
    chainId: 5,
    bip44: 60,
    rpcUrl: 'https://goerli.infura.io/v3/***REMOVED***',
    networkFeeType: NETWORK_FEE_TYPE.EIP1559,
    networkId: NETWORK_ID.ETHEREUM,
    coin: 'ETH',
  },
  [NETWORK.BSC]: {
    name: 'BNB Smart Chain',
    shortName: 'BSC',
    chainId: 56,
    bip44: 60,
    rpcUrl: '***REMOVED***',
    networkFeeType: NETWORK_FEE_TYPE.EVM_LEGACY_GAS,
    networkId: NETWORK_ID.BSC,
    coin: 'BNB',
  },
  [NETWORK.BSC_TESTNET]: {
    name: 'BNB Smart Chain - Testnet',
    shortName: 'BSC Testnet',
    chainId: 97,
    bip44: 60,
    rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    networkFeeType: NETWORK_FEE_TYPE.EVM_LEGACY_GAS,
    networkId: NETWORK_ID.BSC,
    coin: 'BNB',
  },
  [NETWORK.TEZOS]: {
    name: 'Tezos Mainnet',
    shortName: 'Tezos',
    chainId: 1729,
    bip44: 1729,
    rpcUrl: 'https://mainnet-node.madfish.solutions/',
    networkFeeType: NETWORK_FEE_TYPE.TEZOS,
    networkId: NETWORK_ID.XTZ,
    coin: 'XTZ',
  },
  [NETWORK.TEZOS_GHOSTNET]: {
    name: 'Tezos Ghostnet',
    shortName: 'Tezos Ghostnet',
    chainId: 1729,
    bip44: 1729,
    rpcUrl: 'https://ghostnet.smartpy.io/',
    networkFeeType: NETWORK_FEE_TYPE.TEZOS,
    networkId: NETWORK_ID.XTZ,
    coin: 'XTZ',
  },
};

export const SUPPORTED_NETWORKS = [NETWORK.ETH, NETWORK.BSC, NETWORK.TEZOS];

const baseNetwork = appconfig().baseNetwork;

export const networkIdToNetworkByBase = (networkId: NetworkId): Network => {
  let network: Network;
  switch (networkId) {
    case NETWORK_ID.ETHEREUM:
      network = NETWORK.ETH;
      break;
    case NETWORK_ID.BSC:
      network = NETWORK.BSC;
      break;
    case NETWORK_ID.XTZ:
      network = NETWORK.TEZOS;
      break;
  }
  return getNetworkByBase(network);
};

export const getNetworkByBase = (network: Network): Network => {
  let networkByBase: Network = network;
  const isMainnet = baseNetwork === 'mainnet';
  if (!isMainnet) {
    switch (network) {
      case NETWORK.ETH:
        networkByBase = NETWORK.GOERLI;
        break;
      case NETWORK.BSC:
        networkByBase = NETWORK.BSC_TESTNET;
        break;
      case NETWORK.TEZOS:
        networkByBase = NETWORK.TEZOS_GHOSTNET;
        break;
      default:
        networkByBase = NETWORK.GOERLI;
    }
  }
  return networkByBase;
};

export const getNetworkConfig = (network: Network): NetworkConfig => NETWORK_CONFIGS[network];

export const COIN_DTO: Record<string, TokenDto> = {
  BNB: BSC_TOKENLIST[0],
  ETH: ETHEREUM_TOKEN_LIST[0],
  XTZ: TEZOS_TOKEN_LIST[0],
};

export const EXPLORER_BASE_URL: Record<Network, string> = {
  [NETWORK.ETH]: 'https://etherscan.io/tx/',
  [NETWORK.GOERLI]: 'https://goerli.etherscan.io/tx/',
  [NETWORK.BSC]: 'https://bscscan.com/tx/',
  [NETWORK.BSC_TESTNET]: 'https://testnet.bscscan.com/tx/',
  [NETWORK.TEZOS]: 'https://tzkt.io/',
  [NETWORK.TEZOS_GHOSTNET]: 'https://ghostnet.tzkt.io/',
};
