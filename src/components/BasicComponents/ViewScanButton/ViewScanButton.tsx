import React from 'react';

import { useTranslation } from 'react-i18next';

import { EXPLORER_BASE_URL, getNetworkByBase, NETWORK } from '@@constants/network.constant';
import globalModalStore from '@@store/globalModal/globalModalStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';

import { TextButton } from '../Buttons/TextButton';
import { MODAL_TYPES } from '../Modals/GlobalModal';

const ViewScanButton = ({ txHash }: { txHash: string }) => {
  const { t } = useTranslation();
  const { openModal } = globalModalStore();
  const { selectedNetwork: pickNetwork } = walletPersistStore();
  const selectedNetwork = getNetworkByBase(pickNetwork);
  const onPress = () => {
    if (!txHash) {
      return;
    }
    openModal(MODAL_TYPES.VIEW_SCAN, { url: `${EXPLORER_BASE_URL[selectedNetwork]}${txHash}` });
  };
  return <TextButton label={t('view_on_block_explorer')} onPress={onPress} disabled={false} />;
};

export default ViewScanButton;
