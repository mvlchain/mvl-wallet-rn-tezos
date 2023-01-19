import React from 'react';

import { TransactionRequest } from '@ethersproject/abstract-provider';
import { TransferParams } from '@taquito/taquito';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';

import DismissKeyboardView from '@@components/BasicComponents/DismissKeyboardView';
import GasFeeBoard from '@@components/BasicComponents/GasFeeBoard';
import LoadingIndicator from '@@components/BasicComponents/LoadingIndicator';
import { ModalLayout } from '@@components/BasicComponents/Modals/BaseModal/ModalLayout';
import globalModalStore from '@@store/globalModal/globalModalStore';
import { TokenDto } from '@@store/token/tokenPersistStore.type';
import { transactionRequestStore } from '@@store/transaction/transactionRequestStore';

import { MODAL_TYPES } from '../GlobalModal';

function GasFeeModal({
  tokenDto,
  onConfirm,
  onConfirmTitle,
}: {
  tokenDto: TokenDto;
  onConfirm: (params: TransactionRequest | TransferParams) => void;
  onConfirmTitle: string;
}) {
  const { modalType, closeModal } = globalModalStore();
  const { t } = useTranslation();
  const { to, value, tokenTo, tokenValue, data, toValid, valueValid, transferParam } = transactionRequestStore();

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
          <GasFeeBoard
            isRevision={false}
            onConfirm={onConfirm}
            tokenDto={tokenDto}
            onConfirmTitle={onConfirmTitle}
            hideDivider={true}
            to={tokenDto.contractAddress ? tokenTo : to}
            value={tokenDto.contractAddress ? tokenValue : value}
            data={data}
            transferParam={transferParam}
            isValidInput={toValid && valueValid}
          />
        </ScrollView>
      </DismissKeyboardView>
    </ModalLayout>
  );
}

export default GasFeeModal;
