import { useState } from 'react';

import Clipboard from '@react-native-clipboard/clipboard';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';

import { IBottomSelectMenuProps } from '@@components/Modals/BottomSelectModal/BottomSelectMenu/BottomSelectMenu.type';
import { MODAL_TYPES } from '@@components/Modals/GlobalModal';
import TOAST_DEFAULT_OPTION from '@@constants/toastConfig.constant';
import { useDi } from '@@hooks/common/useDi';
import globalModalStore from '@@store/globalModal/globalModalStore';

const useSettingPrivateKeyScreen = () => {
  // TODO: 실제 데이터 연동
  const pkey = 'testPkey!!';
  const wallet_length = 2;
  const { t } = useTranslation();
  const { openModal } = globalModalStore();
  const uiService = useDi('UIService');
  const [type, setType] = useState<'hide' | 'show'>('hide');
  const [sampleWallet, setSampleWallet] = useState<string>('wallet1');

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
    // TODO: 실제 데이터 연동
    const dummyWalletList: IBottomSelectMenuProps[] = [
      {
        title: 'wallet 1',
        isSelected: sampleWallet === 'wallet1',
        onPress: () => {
          setSampleWallet('wallet1');
        },
      },
      {
        title: 'wallet 2',
        isSelected: sampleWallet === 'wallet2',
        onPress: () => {
          setSampleWallet('wallet2');
        },
      },
      {
        title: 'wallet 3',
        isSelected: sampleWallet === 'wallet3',
        onPress: () => {
          setSampleWallet('wallet3');
        },
      },
    ];
    openModal(MODAL_TYPES.BOTTOM_SELECT, { modalTitle: t('select_private_key_title'), menuList: dummyWalletList });
  };

  const onPressWalletList: Function | undefined = () => {
    if (wallet_length > 1) {
      return openWalletListModal;
    } else {
      return undefined;
    }
  };

  return {
    type,
    pkey,
    wallet_length,
    onPressViewPrivatekey,
    onPressCopyPrivateKey,
    onPressWalletList: onPressWalletList(),
  };
};

export default useSettingPrivateKeyScreen;
