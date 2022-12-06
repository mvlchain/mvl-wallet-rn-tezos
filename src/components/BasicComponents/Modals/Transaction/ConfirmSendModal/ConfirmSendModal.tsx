import React from 'react';

import Decimal from 'decimal.js';
import { formatEther, formatUnits } from 'ethers/lib/utils';
import { useTranslation } from 'react-i18next';

import Divider from '@@components/BasicComponents/Divider';
import { DIVIDER_THICKNESS } from '@@components/BasicComponents/Divider/Divider.type';
import { ModalLayout } from '@@components/BasicComponents/Modals/BaseModal/ModalLayout';
import { COIN_DTO, getNetworkConfig, getNetworkName } from '@@constants/network.constant';
import useOneTokenPrice from '@@hooks/useOneTokenPrice';
import globalModalStore from '@@store/globalModal/globalModalStore';
import settingPersistStore from '@@store/setting/settingPersistStore';
import { transactionRequestStore } from '@@store/transaction/transactionRequestStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';
import { height } from '@@utils/ui';

import { MODAL_TYPES } from '../../GlobalModal';

import * as S from './ConfirmSendModal.style';
import { IConfirmSendModalProps } from './ConfirmSendModal.type';

function ConfirmSendModal({ recipientAddress, amount, fee, onConfirm, tokenDto }: IConfirmSendModalProps) {
  const { t } = useTranslation();
  const { modalType, closeModal } = globalModalStore();
  const { selectedNetwork: pickNetwork } = walletPersistStore();
  const selectedNetwork = getNetworkName(false, pickNetwork);
  const network = getNetworkConfig(selectedNetwork);
  const { settedCurrency } = settingPersistStore();

  const { price: tokenPrice } = useOneTokenPrice(tokenDto, formatEther(amount));
  const { price: coinPrice } = useOneTokenPrice(COIN_DTO[network.coin], formatEther(fee));
  const tokenPriceInDeciaml = new Decimal(tokenPrice);
  const coinPriceInDecimal = new Decimal(coinPrice);

  const feeAmountTotal = tokenPriceInDeciaml.add(coinPriceInDecimal);

  return (
    <ModalLayout
      title={t('confirm_send')}
      modalPosition='bottom'
      isVisible={modalType === MODAL_TYPES.CONFIRM_SEND}
      onClose={() => {
        closeModal();
      }}
      onCancel={() => {
        closeModal();
      }}
      onConfirm={onConfirm}
    >
      <S.TopContainer>
        <S.GreyText>{'Recipient Address'}</S.GreyText>
        <S.LargeBlackText>{recipientAddress}</S.LargeBlackText>
      </S.TopContainer>
      <S.MiddleContainer>
        <S.Row>
          <S.BlackText> {t('send_amount')}</S.BlackText>
          <S.RightAlign>
            <S.BlackText>{amount && `${formatEther(amount)} ${tokenDto.symbol}`}</S.BlackText>
            <S.GreyText>{`${tokenPrice} ${settedCurrency}`}</S.GreyText>
          </S.RightAlign>
        </S.Row>
        <S.Row style={{ marginBottom: height * 16 }}>
          <S.BlackText>{t('transaction_fee')}</S.BlackText>
          <S.RightAlign>
            <S.BlackText>{fee && `${formatEther(fee)} ${network.coin}`}</S.BlackText>
            <S.GreyText>{`${coinPrice} ${settedCurrency}`}</S.GreyText>
          </S.RightAlign>
        </S.Row>
        <Divider thickness={DIVIDER_THICKNESS.THIN} />
        <S.Row>
          <S.BlackText>{t('total')}</S.BlackText>
          <S.RightAlign>
            <S.BlackText>{amount && fee && `${formatEther(amount)} ${tokenDto.symbol} + ${formatEther(fee)} ${network.coin}`}</S.BlackText>
            <S.GreyText>{`${feeAmountTotal.toString()} ${settedCurrency}`}</S.GreyText>
          </S.RightAlign>
        </S.Row>
      </S.MiddleContainer>
    </ModalLayout>
  );
}

export default ConfirmSendModal;
