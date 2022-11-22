import { IS_PRODUCT } from 'react-native-dotenv';

import { Network, NETWORK_STRINGS } from '@@constants/network.constant';

export const formatNetwork = (network: Network | string) => {
  const networkType = IS_PRODUCT === 'TRUE' ? 'mainnet' : 'testnet';
  return NETWORK_STRINGS[networkType][network];
};
