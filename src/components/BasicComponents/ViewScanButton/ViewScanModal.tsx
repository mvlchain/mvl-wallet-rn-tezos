import React from 'react';

import { Modal, SafeAreaView } from 'react-native';

import { CloseBlackIconLight, CloseBlackIconDark } from '@@assets/image';
import { MODAL_TYPES } from '@@components/BasicComponents/Modals/GlobalModal';
import Webview from '@@components/BasicComponents/Webview';
import { useAssetFromTheme } from '@@hooks/useTheme';
import globalModalStore from '@@store/globalModal/globalModalStore';

import * as S from './ViewScanModal.style';
function ViewScanModal({ url }: { url: string }) {
  const { modalType, closeModal } = globalModalStore();
  const CloaseIcon = useAssetFromTheme(CloseBlackIconLight, CloseBlackIconDark);
  return (
    <Modal visible={modalType === MODAL_TYPES.VIEW_SCAN}>
      <S.Container>
        <S.Header>
          <CloaseIcon onPress={closeModal} />
        </S.Header>
        <Webview url={url} />
      </S.Container>
    </Modal>
  );
}

export default ViewScanModal;
