import React from 'react';

import { useTranslation } from 'react-i18next';

import { ModalLayout } from '@@components/BasicComponents/Modals/BaseModal/ModalLayout';
import globalModalStore from '@@store/globalModal/globalModalStore';

import { MODAL_TYPES } from '../GlobalModal';

import ClaimWalletListMenu from './ClaimWalletListMenu';
import { IClaimWalletListMenuProps } from './ClaimWalletListMenu/ClaimWalletListMenu.type';
import * as S from './ClaimWalletListModal.style';
import { IClaimWalletListModalProps } from './ClaimWalletListModal.type';

const RenderItem = ({ data }: { data: IClaimWalletListMenuProps }) => {
  const { closeModal } = globalModalStore();

  return (
    <ClaimWalletListMenu
      {...data}
      onPress={() => {
        data.onPress();
        closeModal();
      }}
    />
  );
};

function ClaimWalletListModal({ menuList }: IClaimWalletListModalProps) {
  const { t } = useTranslation();
  const { modalType, closeModal } = globalModalStore();

  return (
    <ModalLayout
      title={t('reward_chooser_dialog_title')}
      modalPosition='bottom'
      maxHeight='70%'
      isVisible={modalType === MODAL_TYPES.CLAIM_WALLET_LIST}
      onClose={() => {
        closeModal();
      }}
    >
      <S.Container>
        <S.ModalWrapper
          data={menuList}
          keyExtractor={(item: IClaimWalletListMenuProps) => item.address}
          renderItem={({ item }) => <RenderItem data={item} />}
          showsVerticalScrollIndicator={false}
          bounces={false}
        />
      </S.Container>
    </ModalLayout>
  );
}

export default ClaimWalletListModal;
