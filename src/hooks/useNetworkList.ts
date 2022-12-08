import { useEffect, useState } from 'react';

import { IBottomSelectMenuProps } from '@@components/BasicComponents/Modals/BottomSelectModal/BottomSelectMenu/BottomSelectMenu.type';
import { getNetworkConfig, getNetworkName, SUPPORTED_NETWORKS } from '@@constants/network.constant';
import walletPersistStore from '@@store/wallet/walletPersistStore';

export const useNetworkList = () => {
  const { selectedNetwork, selectNetwork } = walletPersistStore();

  const [networkList, setNetworkList] = useState<IBottomSelectMenuProps[]>([]);

  useEffect(() => {
    const _networkList: IBottomSelectMenuProps[] = [];
    SUPPORTED_NETWORKS.forEach((network) => {
      _networkList.push({
        id: network,
        title: getNetworkConfig(getNetworkName(false, network)).name,
        isSelected: selectedNetwork === network,
        onPress: () => selectNetwork(network),
      });
    });
    setNetworkList(_networkList);
  }, [selectedNetwork]);

  return {
    networkList,
  };
};
