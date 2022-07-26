import { NETWORK } from '@@assets/constants';

export const useNetwork = () => {
  // @TODO 데이터 연결

  const networkList = [NETWORK.ETHEREUM, NETWORK.BSC];

  return networkList;
};

export const useCurrentNetwork = () => {
  // @TODO 데이터 연결

  const current = NETWORK.ETHEREUM;

  return current;
};
