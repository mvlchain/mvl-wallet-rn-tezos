import React from 'react';

import { TransactionRequest } from '@ethersproject/abstract-provider';
import { TransferParams } from '@taquito/taquito';
import BigNumber from 'bignumber.js';
import { BytesLike } from 'ethers';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';

import DismissKeyboardView from '@@components/BasicComponents/DismissKeyboardView';
import GasFeeBoard from '@@components/BasicComponents/GasFeeBoard';
import { IGasComponentProps } from '@@components/BasicComponents/GasFeeBoard/GasFeeBoard.type';
import LoadingIndicator from '@@components/BasicComponents/LoadingIndicator';
import { ModalLayout } from '@@components/BasicComponents/Modals/BaseModal/ModalLayout';
import globalModalStore from '@@store/globalModal/globalModalStore';

import { MODAL_TYPES } from '../GlobalModal';

export interface IGasFeeModalProps extends IGasComponentProps {
  isVisible?: boolean;
  onClose?: () => void;
}

function GasFeeModal({ onConfirm, onConfirmTitle, to, value, data, transferParam, isValidInput, isVisible, onClose }: IGasFeeModalProps) {
  const { modalType, closeModal } = globalModalStore();
  const { t } = useTranslation();

  return (
    <ModalLayout
      //다국어
      title={`${t('fee_setting')}`}
      modalPosition='bottom'
      isVisible={isVisible ? isVisible : modalType === MODAL_TYPES.GAS_FEE}
      onClose={() => {
        if (onClose) {
          onClose();
        } else {
          closeModal();
        }
      }}
    >
      <LoadingIndicator />
      <DismissKeyboardView>
        <ScrollView style={{ marginLeft: -24, marginRight: -24 }}>
          <GasFeeBoard
            isRevision={false}
            onConfirm={onConfirm}
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
