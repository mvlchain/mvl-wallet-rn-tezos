import { Network, NETWORK_STRINGS } from '@@constants/network.constant';

// TODO: env로 설정
const IS_PRODUCT = 'TRUE';

export const formatNetwork = (network: Network | string) => {
  const networkType = IS_PRODUCT === 'TRUE' ? 'mainnet' : 'testnet';
  return NETWORK_STRINGS[networkType][network];
};
