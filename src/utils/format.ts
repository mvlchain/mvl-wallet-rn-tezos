import { Network } from '@@assets/constants';

import { NETWORK_STRINGS } from '../assets/constants/index';

export const formatNetwork = (network: Network | string) => NETWORK_STRINGS[network];
