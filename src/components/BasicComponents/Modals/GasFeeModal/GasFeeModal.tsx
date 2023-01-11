import React from 'react';

import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';

import DismissKeyboardView from '@@components/BasicComponents/DismissKeyboardView';
import GasFeeBoard from '@@components/BasicComponents/GasFeeBoard';
import LoadingIndicator from '@@components/BasicComponents/LoadingIndicator';
import { ModalLayout } from '@@components/BasicComponents/Modals/BaseModal/ModalLayout';
import { IGasFeeInfo } from '@@domain/gas/GasService.type';
import globalModalStore from '@@store/globalModal/globalModalStore';
import { TokenDto } from '@@store/token/tokenPersistStore.type';

import { MODAL_TYPES } from '../GlobalModal';

function GasFeeModal({ tokenDto, onConfirm }: { tokenDto: TokenDto; onConfirm: (gasFee: IGasFeeInfo) => Promise<void> }) {
  const { modalType, closeModal } = globalModalStore();
  const { t } = useTranslation();

  return (
    <ModalLayout
      //다국어
      title={`${t('fee_setting')}`}
      modalPosition='bottom'
      isVisible={modalType === MODAL_TYPES.GAS_FEE}
      onClose={() => {
        closeModal();
      }}
    >
      <LoadingIndicator />
      <DismissKeyboardView>
        <ScrollView style={{ marginLeft: -24, marginRight: -24 }}>
          <GasFeeBoard isRevision={false} onConfirm={onConfirm} tokenDto={tokenDto} onConfirmTitle={t('trade')} hideDivider={true} />
        </ScrollView>
      </DismissKeyboardView>
    </ModalLayout>
  );
}

export default GasFeeModal;
