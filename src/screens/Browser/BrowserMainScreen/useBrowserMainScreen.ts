import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { NFTImage, BridgeImage } from '@@assets/image';
import { MODAL_TYPES } from '@@components/BasicComponents/Modals/GlobalModal';
import { ROOT_STACK_ROUTE, TRootStackNavigationProps } from '@@navigation/RootStack/RootStack.type';
import globalModalStore from '@@store/globalModal/globalModalStore';

const useBrowserMainScreen = () => {
  type rootStackProps = TRootStackNavigationProps<'MAIN'>;
  const rootNavigation = useNavigation<rootStackProps>();
  const { t } = useTranslation();
  const { openModal, closeModal } = globalModalStore();
  const onPressSearchBtn = () => {
    // TODO: move to search screen
    rootNavigation.navigate(ROOT_STACK_ROUTE.BROWSER_SEARCH);
  };
  const dappList = [
    {
      Image: BridgeImage,
      title: t('mvl_nft'),
      description: t('mvl_nft_description'),
      onPress: () => {
        openModal(MODAL_TYPES.IMAGE_BACKGROUND, {
          title: t('mvl_nft'),
          description: t('mvl_nft_description'),
          Image: BridgeImage,
          modalPosition: 'bottom',
          confirmLabel: t('go'),
          onConfirm: () => {},
          onClose: closeModal,
        });
      },
    },
    {
      Image: NFTImage,
      title: t('mvl_bridge'),
      description: t('mvl_bridge_description'),
      onPress: () => {
        openModal(MODAL_TYPES.IMAGE_BACKGROUND, {
          title: t('mvl_bridge'),
          description: t('mvl_bridge_description'),
          Image: NFTImage,
          modalPosition: 'bottom',
          confirmLabel: t('go'),
          onConfirm: () => {},
        });
      },
    },
  ];
  return {
    dappList,
    onPressSearchBtn,
  };
};

export default useBrowserMainScreen;
