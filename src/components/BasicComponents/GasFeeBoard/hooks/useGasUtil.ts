import { useTranslation } from 'react-i18next';

import { getNetworkConfig } from '@@constants/network.constant';
import useCoinDto from '@@hooks/useCoinDto';
import walletPersistStore from '@@store/wallet/walletPersistStore';
import { commonColors } from '@@style/colors';

const useGasUtil = () => {
  const { t } = useTranslation();
  const { selectedNetwork } = walletPersistStore();
  const network = getNetworkConfig(selectedNetwork);

  const { coinDto } = useCoinDto();

  const grey = commonColors.grey500;
  const red = commonColors.red;

  const textForm = (text: string) => {
    return `${t('maximum')} ${text} ${coinDto.symbol}`;
  };

  return {
    grey,
    red,
    textForm,
    networkFeeType: network.networkFeeType,
  };
};
export default useGasUtil;
