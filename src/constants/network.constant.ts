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
};

export const NETWORK_CONFIGS: Record<Network, NetworkConfig> = {
  [NETWORK.ETH]: {
    name: 'Ethereum Main Network',
    shortName: 'Ethereum',
    chainId: 1,
    bip44: 60,
    rpcUrl: '***REMOVED***',
    networkFeeType: NETWORK_FEE_TYPE.EIP1559,
    networkId: NETWORK_ID.ETHEREUM,
  },
  [NETWORK.GOERLI]: {
    name: 'Ethereum Goerli Testnet',
    shortName: 'Goerli Testnet',
    chainId: 5,
    bip44: 60,
    rpcUrl: 'https://goerli.infura.io/v3/***REMOVED***',
    networkFeeType: NETWORK_FEE_TYPE.EIP1559,
    networkId: NETWORK_ID.ETHEREUM,
  },
  [NETWORK.BSC]: {
    name: 'BNB Smart Chain',
    shortName: 'BSC',
    chainId: 56,
    bip44: 60,
    rpcUrl: '***REMOVED***',
    networkFeeType: NETWORK_FEE_TYPE.EVM_LEGACY_GAS,
    networkId: NETWORK_ID.BSC,
  },
  [NETWORK.BSC_TESTNET]: {
    name: 'BNB Smart Chain - Testnet',
    shortName: 'BSC Testnet',
    chainId: 97,
    bip44: 60,
    rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    networkFeeType: NETWORK_FEE_TYPE.EVM_LEGACY_GAS,
    networkId: NETWORK_ID.BSC,
  },
  [NETWORK.TEZOS]: {
    name: 'Tezos Mainnet',
    shortName: 'Tezos',
    chainId: 1729,
    bip44: 1729,
    rpcUrl: 'https://mainnet-node.madfish.solutions/',
    networkFeeType: NETWORK_FEE_TYPE.TEZOS,
    networkId: NETWORK_ID.XTZ,
  },
  [NETWORK.TEZOS_GHOSTNET]: {
    name: 'Tezos Ghostnet',
    shortName: 'Tezos Ghostnet',
    chainId: 1729,
    bip44: 1729,
    rpcUrl: 'https://ghostnet.smartpy.io/',
    networkFeeType: NETWORK_FEE_TYPE.TEZOS,
    networkId: NETWORK_ID.XTZ,
  },
};

export const SUPPORTED_NETWORKS = [NETWORK.ETH, NETWORK.BSC, NETWORK.TEZOS];

// TODO: inMainnet을 체크하는 부분 False로 하드코딩 되어있는 부분 수정 필요
export const getNetworkName = (isMainnet: boolean, network: Network) => {
  let networkName: Network = network;
  if (!isMainnet) {
    switch (network) {
      case NETWORK.ETH:
        networkName = NETWORK.GOERLI;
        break;
      case NETWORK.BSC:
        networkName = NETWORK.BSC_TESTNET;
        break;
      case NETWORK.TEZOS:
        networkName = NETWORK.TEZOS_GHOSTNET;
        break;
      default:
        networkName = NETWORK.GOERLI;
    }
  }
  return networkName;
};

export const getNetworkConfig = (network: Network): NetworkConfig => NETWORK_CONFIGS[network];
