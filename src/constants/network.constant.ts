import { ETH_RPC_URL, GOERLI_RPC_URL, BSC_RPC_URL, BSC_TESTNET_RPC_URL, TEZOS_RPC_URL, TEZOS_GHOSTNET_RPC_URL } from '@env';

import appconfig from '@@config/appconfig';
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
  multicallAddress?: string;
  infuraNetwork?: 'mainnet' | 'goerli';
  supportBrowser: boolean;
};

const NETWORK_CONFIGS: Record<Network, NetworkConfig> = {
  [NETWORK.ETH]: {
    name: 'Ethereum Main Network',
    shortName: 'Ethereum',
    chainId: 1,
    bip44: 60,
    rpcUrl: ETH_RPC_URL,
    networkFeeType: NETWORK_FEE_TYPE.EIP1559,
    networkId: NETWORK_ID.ETHEREUM,
    coin: 'ETH',
    multicallAddress: '0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441',
    supportBrowser: true,
  },
  [NETWORK.GOERLI]: {
    name: 'Ethereum Goerli Testnet',
    shortName: 'Goerli Testnet',
    chainId: 5,
    bip44: 60,
    rpcUrl: GOERLI_RPC_URL,
    networkFeeType: NETWORK_FEE_TYPE.EIP1559,
    networkId: NETWORK_ID.ETHEREUM,
    coin: 'ETH',
    multicallAddress: '0x77dCa2C955b15e9dE4dbBCf1246B4B85b651e50e',
    infuraNetwork: 'goerli',
    supportBrowser: true,
  },
  [NETWORK.BSC]: {
    name: 'BNB Smart Chain',
    shortName: 'BSC',
    chainId: 56,
    bip44: 60,
    rpcUrl: BSC_RPC_URL,
    networkFeeType: NETWORK_FEE_TYPE.EVM_LEGACY_GAS,
    networkId: NETWORK_ID.BSC,
    coin: 'BNB',
    multicallAddress: '0x1Ee38d535d541c55C9dae27B12edf090C608E6Fb',
    supportBrowser: true,
  },
  [NETWORK.BSC_TESTNET]: {
    name: 'BNB Smart Chain - Testnet',
    shortName: 'BSC Testnet',
    chainId: 97,
    bip44: 60,
    rpcUrl: BSC_TESTNET_RPC_URL,
    networkFeeType: NETWORK_FEE_TYPE.EVM_LEGACY_GAS,
    networkId: NETWORK_ID.BSC,
    coin: 'BNB',
    multicallAddress: '0x6e5BB1a5Ad6F68A8D7D6A5e47750eC15773d6042',
    supportBrowser: true,
  },
  [NETWORK.TEZOS]: {
    name: 'Tezos Mainnet',
    shortName: 'Tezos',
    chainId: 1729,
    bip44: 1729,
    rpcUrl: TEZOS_RPC_URL,
    networkFeeType: NETWORK_FEE_TYPE.TEZOS,
    networkId: NETWORK_ID.XTZ,
    coin: 'XTZ',
    supportBrowser: false,
  },
  [NETWORK.TEZOS_GHOSTNET]: {
    name: 'Tezos Ghostnet',
    shortName: 'Tezos Ghostnet',
    chainId: 1729,
    bip44: 1729,
    rpcUrl: TEZOS_GHOSTNET_RPC_URL,
    networkFeeType: NETWORK_FEE_TYPE.TEZOS,
    networkId: NETWORK_ID.XTZ,
    coin: 'XTZ',
    supportBrowser: false,
  },
};

export const SUPPORTED_NETWORKS = [NETWORK.ETH, NETWORK.BSC, NETWORK.TEZOS];

const baseNetwork = appconfig().baseNetwork;

export const networkIdToNetwork = (networkId: NetworkId): Network => {
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
  return network;
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

export const EXPLORER_BASE_URL: Record<Network, string> = {
  [NETWORK.ETH]: 'https://etherscan.io/tx/',
  [NETWORK.GOERLI]: 'https://goerli.etherscan.io/tx/',
  [NETWORK.BSC]: 'https://bscscan.com/tx/',
  [NETWORK.BSC_TESTNET]: 'https://testnet.bscscan.com/tx/',
  [NETWORK.TEZOS]: 'https://tzkt.io/',
  [NETWORK.TEZOS_GHOSTNET]: 'https://ghostnet.tzkt.io/',
};
