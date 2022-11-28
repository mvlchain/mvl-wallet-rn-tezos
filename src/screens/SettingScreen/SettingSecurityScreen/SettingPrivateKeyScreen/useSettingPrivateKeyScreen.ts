import { useState } from 'react';

import Clipboard from '@react-native-clipboard/clipboard';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';

import { MODAL_TYPES } from '@@components/BasicComponents/Modals/GlobalModal';
import useWalletListModal from '@@components/BasicComponents/Modals/WalletListModal/useWalletListModal';
import TOAST_DEFAULT_OPTION from '@@constants/toastConfig.constant';
import { useDi } from '@@hooks/useDi';
import globalModalStore from '@@store/globalModal/globalModalStore';

const useSettingPrivateKeyScreen = () => {
  // TODO: 실제 데이터 연동
  const [pkey, setPkey] = useState('');
  const { t } = useTranslation();
  const { openModal } = globalModalStore();
  const uiService = useDi('UIService');
  const [type, setType] = useState<'hide' | 'show'>('hide');
  const { wallet } = useWalletListModal();

  const onPressViewPrivatekey = async () => {
    await uiService.triggerGetPincode();
    setType('show');
  };

  const onPressCopyPrivateKey = () => {
    // TODO: pKey 없을 때 예외처리(에러처리)추가
    if (!pkey) return;
    Clipboard.setString(pkey);
    Toast.show({
      ...TOAST_DEFAULT_OPTION,
      type: 'basic',
      text1: t('copy_to_clipboard'),
    });
  };

  const openWalletListModal = () => {
    if (!wallet) return;
    openModal(MODAL_TYPES.WALLET_LIST, { menuList: wallet });
  };

  const onPressWalletList: Function | undefined = () => {
    if (!wallet) return;
    if (wallet.length > 1) {
      return openWalletListModal;
    } else {
      return undefined;
    }
  };

  return {
    type,
    pkey,
    wallet,
    onPressViewPrivatekey,
    onPressCopyPrivateKey,
    onPressWalletList: onPressWalletList(),
  };
};

export default useSettingPrivateKeyScreen;
