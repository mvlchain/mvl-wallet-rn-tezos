import React from 'react';

import { useTranslation } from 'react-i18next';
import { FlatList, ScrollView } from 'react-native';

import { PrimaryButton } from '@@components/BasicComponents/Buttons/BaseButton';
import { BUTTON_SIZE } from '@@components/BasicComponents/Buttons/Button.type';
import { BaseModal } from '@@components/BasicComponents/Modals/BaseModal';
import { useDi } from '@@hooks/common/useDi';
import globalModalStore from '@@store/globalModal/globalModalStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';

import { MODAL_TYPES } from '../GlobalModal';

import WalletListMenu from './WalletListMenu';
import { IWalletListMenuProps } from './WalletListMenu/WalletListMenu.type';
import * as S from './WalletListModal.style';
import { IWalletListModalProps } from './WalletListModal.type';

const RenderItem = ({ data }: { data: IWalletListMenuProps }) => {
  const { closeModal } = globalModalStore();

  return (
    <WalletListMenu
      {...data}
      onPress={() => {
        data.onPress();
        closeModal();
      }}
    />
  );
};

function WalletListModal({ menuList }: IWalletListModalProps) {
  const { t } = useTranslation();
  const keyClient = useDi('KeyClient');
  const postboxkey = keyClient.postboxKeyHolder?.postboxKey;
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
        <S.ModalWrapper
          data={menuList}
          keyExtractor={(item: IWalletListMenuProps) => item.address}
          renderItem={({ item }) => <RenderItem data={item} />}
          showsVerticalScrollIndicator={false}
          bounces={false}
        />
        <S.ButtonContainer>
          <PrimaryButton
            onPress={() => {
              if (!postboxkey) return;
              createWallet(postboxkey);
              closeModal();
            }}
            label={t('create_wallet')}
            size={BUTTON_SIZE.SMALL}
          />
        </S.ButtonContainer>
      </S.Container>
    </BaseModal>
  );
}

export default WalletListModal;
