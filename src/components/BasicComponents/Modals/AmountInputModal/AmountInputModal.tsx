import React, { useState } from 'react';

import { BigNumber } from 'ethers';
import { useTranslation } from 'react-i18next';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';

import { ModalLayout } from '@@components/BasicComponents/Modals/BaseModal/ModalLayout';
import { BaseTextField } from '@@components/BasicComponents/TextFields/BaseTextField';
import { TradeVolume } from '@@components/BasicComponents/TextFields/TradeVolume';
import globalModalStore from '@@store/globalModal/globalModalStore';

import { MODAL_TYPES } from '../GlobalModal';

import { IAmountInputModalProps } from './AmountInputModal.type';

function AmountInputModal({ title, tokenDto, cancelLabel, confirmLabel, onCancel, onConfirm }: IAmountInputModalProps) {
  const { t } = useTranslation();
  const { modalType, closeModal } = globalModalStore();
  const [value, setValue] = useState<BigNumber>(BigNumber.from('0'));

  const onChangeInput = (amount: BigNumber) => {
    console.log('amount:  ', amount);
    setValue(amount);
  };

  return (
    <ModalLayout
      title={title}
      modalPosition='bottom'
      isVisible={modalType === MODAL_TYPES.AMOUNT_INPUT}
      onConfirm={() => {
        if (!!onConfirm) {
          onConfirm(value.toString(), tokenDto.decimals);
        }
        closeModal();
      }}
      onClose={closeModal}
      onCancel={onCancel}
      cancelLabel={cancelLabel}
      confirmLabel={confirmLabel}
      // isConfirmDisabled={value.toString() === '0'}
    >
      <TradeVolume label={t('amount')} onChange={onChangeInput} value={value} useMax={false} tokenDto={tokenDto} disableHint={true} />
    </ModalLayout>
  );
}

export default AmountInputModal;
