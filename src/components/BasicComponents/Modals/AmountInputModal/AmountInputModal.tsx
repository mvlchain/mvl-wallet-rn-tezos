import React, { useState } from 'react';

import { BigNumber } from 'bignumber.js';
import { useTranslation } from 'react-i18next';

import { ModalLayout } from '@@components/BasicComponents/Modals/BaseModal/ModalLayout';
import { TradeVolume } from '@@components/BasicComponents/TextFields/TradeVolume/TradeVolume';
import globalModalStore from '@@store/globalModal/globalModalStore';

import { MODAL_TYPES } from '../GlobalModal';

import { IAmountInputModalProps } from './AmountInputModal.type';

function AmountInputModal({ title, tokenDto, cancelLabel, confirmLabel, onCancel, onConfirm }: IAmountInputModalProps) {
  const { t } = useTranslation();
  const { modalType, closeModal } = globalModalStore();
  const [value, setValue] = useState<BigNumber | null>(null);

  const onChangeInput = (amount: BigNumber | null) => {
    setValue(amount);
  };

  return (
    <ModalLayout
      title={title}
      modalPosition='bottom'
      isVisible={modalType === MODAL_TYPES.AMOUNT_INPUT}
      onConfirm={() => {
        if (!!onConfirm) {
          if (!value) return;
          onConfirm(value.toString(), tokenDto);
        }
      }}
      onClose={closeModal}
      onCancel={onCancel}
      cancelLabel={cancelLabel}
      confirmLabel={confirmLabel}
      isConfirmDisabled={!value}
    >
      <TradeVolume
        label={t('amount')}
        value={value}
        setValue={onChangeInput}
        useMax={false}
        tokenDto={tokenDto}
        hideBalance={true}
        debounceTime={0}
      />
    </ModalLayout>
  );
}

export default AmountInputModal;
