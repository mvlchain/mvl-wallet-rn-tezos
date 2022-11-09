import React from 'react';

import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';

import { PrimaryButton } from '@@components/BasicComponents/Buttons/BaseButton';
import { BUTTON_SIZE } from '@@components/BasicComponents/Buttons/Button.type';
import { BaseModal } from '@@components/BasicComponents/Modals/BaseModal';
import globalModalStore from '@@store/globalModal/globalModalStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';

import { MODAL_TYPES } from '../GlobalModal';

import WalletListMenu from './WalletListMenu';
import * as S from './WalletListModal.style';
import { IWalletListModalProps } from './WalletListModal.type';

function WalletListModal({ menuList }: IWalletListModalProps) {
  const { t } = useTranslation();
  const { modalType, closeModal } = globalModalStore();
  const { createWallet } = walletPersistStore();
  return (
    <BaseModal
      title={t('wallet_list')}
      modalPosition='bottom'
      maxHeight='70%'
      isVisible={modalType === MODAL_TYPES.WALLET_LIST}
      onClose={() => {
        closeModal();
      }}
    >
      <S.Container>
        <S.ModalWrapper bounces={false} showsVerticalScrollIndicator={false}>
          {menuList.map((props) => (
            <WalletListMenu
              {...props}
              onPress={() => {
                props.onPress();
                closeModal();
              }}
            />
          ))}
        </S.ModalWrapper>
        <S.ButtonContainer>
          <PrimaryButton
            onPress={() => {
              createWallet();
              closeModal();
            }}
            label={'Create Wallet'}
            size={BUTTON_SIZE.SMALL}
          />
        </S.ButtonContainer>
      </S.Container>
    </BaseModal>
  );
}

export default WalletListModal;
