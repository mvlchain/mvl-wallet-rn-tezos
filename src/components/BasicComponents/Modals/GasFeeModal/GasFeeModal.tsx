import React from 'react';

import { TransactionRequest } from '@ethersproject/abstract-provider';
import { TransferParams } from '@taquito/taquito';
import BigNumber from 'bignumber.js';
import { BytesLike } from 'ethers';
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

export interface IGasFeeModalProps {
  tokenDto: TokenDto;
  onConfirm: (params: TransactionRequest | TransferParams) => void;
  onConfirmTitle: string;
  to: string | null;
  value?: BigNumber | null;
  data?: BytesLike | null;
  transferParam?: TransferParams;
  isValidInput: boolean;
}

function GasFeeModal({ tokenDto, onConfirm, onConfirmTitle, to, value, data, transferParam, isValidInput }: IGasFeeModalProps) {
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
          <GasFeeBoard
            isRevision={false}
            onConfirm={onConfirm}
            tokenDto={tokenDto}
            onConfirmTitle={onConfirmTitle}
            hideDivider={true}
            to={to}
            value={value}
            data={data}
            transferParam={transferParam}
            isValidInput={isValidInput}
          />
        </ScrollView>
      </DismissKeyboardView>
    </ModalLayout>
  );
}

export default GasFeeModal;
