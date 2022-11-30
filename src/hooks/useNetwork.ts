import { NETWORK } from '@@assets/constants';

export const useNetwork = () => {
  // @TODO 데이터 연결

  const networkList = [NETWORK.ETH, NETWORK.BSC];

  return networkList;
};

export const useCurrentNetwork = () => {
  // @TODO 데이터 연결

  const current = NETWORK.ETH;

  return current;
};
