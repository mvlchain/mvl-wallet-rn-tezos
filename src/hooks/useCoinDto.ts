import { getNetworkByBase } from '@@constants/network.constant';
import tokenPersistStore from '@@store/token/tokenPersistStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';

const useCoinDto = () => {
  const { selectedNetwork } = walletPersistStore();
  const { tokenList } = tokenPersistStore();
  const coinDto = tokenList[getNetworkByBase(selectedNetwork)].find((dto) => !dto.contractAddress) ?? tokenList[getNetworkByBase(selectedNetwork)][0];
  return { coinDto };
};

export default useCoinDto;
