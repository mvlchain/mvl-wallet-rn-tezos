import { useCallback, useEffect, useState } from 'react';

import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { ethers } from 'ethers';
import { useTranslation } from 'react-i18next';

import { getNetworkConfig, Network, NETWORK_ID, getNetworkByBase } from '@@constants/network.constant';
import { TOAST_TYPE } from '@@constants/toastConfig.constant';
import walletPersistStore from '@@store/wallet/walletPersistStore';

import { useDi } from './useDi';
import useToast from './useToast';

const useNetworkCheck = () => {
  const { selectedNetwork } = walletPersistStore();
  const [connectable, setConnectable] = useState<boolean>(true);
  const isFocused = useIsFocused();
  const providerholder = useDi('EvmJsonRpcProviderHolder');
  const network = getNetworkConfig(getNetworkByBase(selectedNetwork));
  const networkId = network.networkId;
  const { showToast } = useToast();
  const { t } = useTranslation();

  const checkNetwork = async () => {
    try {
      switch (networkId) {
        case NETWORK_ID.ETHEREUM:
        case NETWORK_ID.BSC:
          const provider = providerholder.getProvider(network.rpcUrl);
          const check = await provider.getNetwork();
          if (check) {
            setConnectable(true);
          } else {
            setConnectable(false);
          }
        case NETWORK_ID.XTZ:
        //TODO: 테조스 버전 나중에 작성
      }
    } catch (err: any) {
      console.error('check network error', err.message);
      showToast(TOAST_TYPE.ERROR, t('msg_error_no_internet'));
      setConnectable(false);
    }
  };

  useEffect(() => {
    console.log('check network', selectedNetwork, 'connectable', connectable);
  }, [connectable]);

  useFocusEffect(
    useCallback(() => {
      if (isFocused) {
        checkNetwork();
      }
    }, [isFocused])
  );

  return { connectable, checkNetwork };
};

export default useNetworkCheck;
