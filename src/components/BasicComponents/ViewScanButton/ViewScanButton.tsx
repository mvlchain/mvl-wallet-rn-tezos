import React from 'react';

import { useTranslation } from 'react-i18next';

import { EXPLORER_BASE_URL, getNetworkName, NETWORK } from '@@constants/network.constant';
import globalModalStore from '@@store/globalModal/globalModalStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';

import { TextButton } from '../Buttons/TextButton';
import { MODAL_TYPES } from '../Modals/GlobalModal';

const ViewScanButton = ({ txHash }: { txHash: string }) => {
  const { t } = useTranslation();
  const { openModal } = globalModalStore();
  const { selectedNetwork: pickNetwork } = walletPersistStore();
  const selectedNetwork = getNetworkName(false, pickNetwork);
  const onPress = () => {
    if (!txHash) {
      return;
    }
    openModal(MODAL_TYPES.VIEW_SCAN, { url: `${EXPLORER_BASE_URL[selectedNetwork]}${txHash}` });
  };
  //TODO: 임의설정, 각 스캐너명칭정하고 다국어 엑셀파일에 등록필요
  const scanLabel = () => {
    switch (pickNetwork) {
      case NETWORK.ETH:
        return t('view_etherscan');
      case NETWORK.BSC:
        return t('view_bscscan');
      case NETWORK.TEZOS:
        return t('view_tezosscan');
      default:
        return t('view_scan');
    }
  };

  return <TextButton label={scanLabel()} onPress={onPress} disabled={false} />;
};

export default ViewScanButton;
