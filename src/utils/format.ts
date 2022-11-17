import { Network } from '@@assets/constants';
import { NETWORK_STRINGS } from '@@constants/network.constant';

export const formatNetwork = (network: Network | string) => NETWORK_STRINGS[network];
